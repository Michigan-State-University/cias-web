# Notification Event Types & WebSocket Receive Actions

**When to load:** Tracing how the backend pushes real-time events over WebSockets and which Redux actions consume them in the notifications or liveChat reducers.

## Quick Summary

The backend emits server-push events whose wire values are enumerated in `NotificationEvent`. The client receives them via channel hooks built on `useSocket`, and the Redux layer absorbs them through two families of `onXReceive` actions: the `notifications` reducer handles system-wide notification delivery, while the `liveChat` reducer handles conversation-specific channel events. Each server event carries a typed `data` payload alongside common envelope fields (`id`, `notifiableId`, `notifiableType`, `createdAt`, `isRead`).

**Answers questions like:**
- What string values does the backend actually send over the WebSocket?
- Which Redux action handles a new chat message arriving over the socket?
- Which Redux action handles a new collaborator notification?
- Which reducer owns `onConversationCreatedReceive`?
- What is the payload shape for a `conversation_transcript_ready` event?

**Common scenarios:** debugging a missing real-time update, adding a new server-push event, wiring a new `onXReceive` handler into the reducer, checking which events carry file attachment data.

---

## NotificationEvent Wire Values _(src: app/models/Notification/NotificationEvent.ts)_

These are the exact strings the backend places in the `event` field of each pushed notification.

| Enum Member | Wire String | Domain Area |
|---|---|---|
| `NEW_CONVERSATION` | `new_conversation` | LiveChat |
| `AUTO_GENERATED_CONVERSATION` | `auto_generated_conversation` | LiveChat (enum only — no concrete Notification type at scan time) |
| `NEW_NARRATOR_WAS_SET` | `new_narrator_was_set` | Session narrator |
| `CONVERSATION_TRANSCRIPT_READY` | `conversation_transcript_ready` | LiveChat |
| `INTERVENTION_CONVERSATIONS_TRANSCRIPT_READY` | `intervention_conversations_transcript_ready` | LiveChat |
| `SUCCESSFULLY_RESTORED_INTERVENTION` | `successfully_restored_intervention` | Intervention import/restore |
| `UNSUCCESSFUL_INTERVENTION_IMPORT` | `unsuccessful_intervention_import` | Intervention import |
| `NEW_COLLABORATOR_ADDED` | `new_collaborator_added` | Intervention collaboration |
| `COLLABORATOR_REMOVED` | `collaborator_removed` | Intervention collaboration |
| `START_EDITING_INTERVENTION` | `start_editing_intervention` | Intervention edit mode |
| `STOP_EDITING_INTERVENTION` | `stop_editing_intervention` | Intervention edit mode |
| `SENSITIVE_DATA_REMOVED` | `sensitive_data_removed` | Participant data removal |

## Notification Envelope & Data Shapes _(src: app/models/Notification/Notification.ts, app/models/Notification/NotificationData.ts)_

Every pushed notification is typed as `GenericNotification<Event, Data>` with these envelope fields:

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Notification record ID |
| `notifiableId` | `string` | ID of the related entity |
| `notifiableType` | `string` | Type name of the related entity |
| `createdAt` | `string` | ISO timestamp |
| `isRead` | `boolean` | Whether the notification has been read |
| `event` | `NotificationEvent` | Wire string (see table above) |
| `data` | `NotificationData` | Event-specific payload |

Per-event `data` shapes observed at scan time:

| Event | Key `data` Fields |
|---|---|
| `new_conversation` | `conversationId`, `userId`, `firstName`, `lastName`, `message`, `avatarUrl?` |
| `new_narrator_was_set` | `name`, `newNarrator` (CharacterType) |
| `conversation_transcript_ready` | `conversationId`, `interventionName`, `transcript` (AppFile), `archived` |
| `intervention_conversations_transcript_ready` | `interventionId`, `interventionName`, `transcript` (AppFile) |
| `successfully_restored_intervention` | `interventionId`, `interventionName` |
| `unsuccessful_intervention_import` | _(empty object)_ |
| `new_collaborator_added` | `interventionId`, `interventionName` |
| `collaborator_removed` | `interventionId`, `interventionName` |
| `start_editing_intervention` | `interventionId`, `interventionName`, `userId`, `firstName`, `lastName`, `avatarUrl` |
| `stop_editing_intervention` | `interventionId`, `interventionName`, `userId`, `firstName`, `lastName`, `avatarUrl` |
| `sensitive_data_removed` | `interventionId`, `interventionName` |

## `notifications` Reducer — onXReceive Handlers _(src: app/global/reducers/notifications/actions.ts)_

These actions are dispatched when the WebSocket channel (NotificationChannel) delivers a message to the Redux store.

| Action Creator | Payload |
|---|---|
| `onUnreadNotificationsFetchedReceive` | `notifications: Notification[]` (initial unread batch) |
| `onNewNotificationReceive` | `notification: Notification` (single push) |

The non-receive actions in this reducer (`setNotificationsListVisible`, `markNotificationReadLocally`, `setNavigatorAvailabilityLocally`) are client-driven, not WebSocket-driven.

## `liveChat` Reducer — onXReceive Handlers _(src: app/global/reducers/liveChat/actions.ts)_

These actions are dispatched by the ConversationChannel WebSocket listener:

| Action Creator | Payload |
|---|---|
| `onMessageSentReceive` | `message: Message` |
| `onMessageReadReceive` | `conversationId`, `messageId` |
| `onConversationCreatedReceive` | `newConversationData: { conversation, interventionConversation }` |
| `onConversationArchivedReceive` | `conversationId`, `archivedAt` |
| `onLiveChatSetupFetchedReceive` | `liveChatSetup` |
| `onCurrentScreenTitleChanged` | `conversationId`, `currentScreenTitle` |

The remaining liveChat actions (`fetchActiveConversationsRequest`, `setCreatingConversation`, `setCallingOutNavigator`, `setWaitingForNavigator`, etc.) are HTTP-request-initiated or local UI state mutations, not channel receive handlers.
