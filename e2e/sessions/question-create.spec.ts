import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage, SessionPage } from '../pages';

test.describe('Question Creation - Single Answer', () => {
  
  test('should create intervention, session, and single answer question', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');

    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    expect(await interventionPage.getSessionCount()).toBe(1);

    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);

    await sessionPage.verifySessionPageLoaded();

    const addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    const questionTypeChooser = page.locator('[data-cy="question-type-chooser"]');
    await expect(questionTypeChooser).toBeVisible();

    await expect(page.getByText('Choose type of screen')).toBeVisible();

    const singleAnswerOption = page.locator('[data-cy="question-type-single"]');
    await expect(singleAnswerOption).toBeVisible();

    const createQuestionPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await singleAnswerOption.click();

    const response = await createQuestionPromise;
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toBeTruthy();
    expect(responseBody.data).toBeTruthy();

    const questionGroup = responseBody.data;
    expect(questionGroup.type).toBe('question_group');
    expect(questionGroup.attributes).toBeTruthy();

    await page.waitForTimeout(1000);

    const questionListItem = page.locator('[data-cy^="question-list-item-"]').first();
    await expect(questionListItem).toBeVisible({ timeout: 10000 });

    const questionDetails = page.locator('[data-cy="question-details"]');
    await expect(questionDetails).toBeVisible();

    await expect(page.getByText('Single answer')).toBeVisible();

    const mainTextField = page.locator('[data-cy="question-subtitle-input"]');
    await expect(mainTextField).toBeVisible();

    const variableInput = page.locator('[data-cy^="question-variable-input-"]');
    await expect(variableInput.first()).toBeVisible();

    await page.waitForTimeout(1000);

    const addAnswerButton = page.locator('[data-cy="add-answer-button"]');
    await expect(addAnswerButton).toBeVisible({ timeout: 10000 });

    console.log('✓ Test passed: Successfully created intervention, session, and single answer question');
    console.log('✓ Verified question type chooser, question details, and add answer button are present');
  });

  test('should create single answer question and verify screen presentation', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;
    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await sessionPage.verifySessionPageLoaded();

    await page.locator('[data-cy="add-screen-button"]').click();

    const createQuestionPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await page.locator('[data-cy="question-type-single"]').click();
    await createQuestionPromise;

    await page.waitForTimeout(1000);

    const questionsList = page.locator('[data-cy="questions-list"]');
    await expect(questionsList).toBeVisible();

    const titleInput = page.locator('[data-cy="question-title-input"]');
    await expect(titleInput).toBeVisible();

    const subtitleInput = page.locator('[data-cy="question-subtitle-input"]');
    await expect(subtitleInput).toBeVisible();

    const variableSection = page.locator('[data-cy^="question-variable-input-"]').first();
    await expect(variableSection).toBeVisible();

    const addAnswerBtn = page.locator('[data-cy="add-answer-button"]');
    await expect(addAnswerBtn).toBeVisible();

    const settingsPanel = page.locator('[data-cy="question-settings-panel"]');
    await expect(settingsPanel).toBeVisible();

    console.log('✓ Test passed: All expected UI elements for single answer question are present');
  });

  test('should create Name question and verify it cannot be added again', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    expect(await interventionPage.getSessionCount()).toBe(1);

    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await sessionPage.verifySessionPageLoaded();

    const addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    const questionTypeChooser = page.locator('[data-cy="question-type-chooser"]');
    await expect(questionTypeChooser).toBeVisible();

    const nameQuestionOption = page.locator('[data-cy="question-type-name"]');
    await expect(nameQuestionOption).toBeVisible();
    await expect(nameQuestionOption).not.toBeDisabled();

    const createQuestionPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await nameQuestionOption.click();

    const response = await createQuestionPromise;
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toBeTruthy();
    expect(responseBody.data).toBeTruthy();

    const questionGroup = responseBody.data;
    expect(questionGroup.type).toBe('question_group');
    expect(questionGroup.attributes).toBeTruthy();

    await page.waitForTimeout(1000);

    const questionListItem = page.locator('[data-cy^="question-list-item-"]').first();
    await expect(questionListItem).toBeVisible({ timeout: 10000 });

    const questionDetails = page.locator('[data-cy="question-details"]');
    await expect(questionDetails).toBeVisible();

    await expect(questionDetails.getByText('Name').first()).toBeVisible();

    await page.waitForTimeout(500);
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    await expect(questionTypeChooser).toBeVisible();

    const nameQuestionOptionDisabled = page.locator('[data-cy="question-type-name"]');
    await expect(nameQuestionOptionDisabled).toBeVisible();

    const tooltipIcon = nameQuestionOptionDisabled.locator('svg[alt="?"]');
    await expect(tooltipIcon).toBeVisible();

    await tooltipIcon.hover();

    await page.waitForTimeout(500);

    const tooltipMessage = page.getByText('This question is available only once per session');
    await expect(tooltipMessage).toBeVisible({ timeout: 5000 });

    const questionCountBefore = await page.locator('[data-cy^="question-list-item-"]').count();

    let apiCallMade = false;
    page.on('response', (response) => {
      if (response.url().includes('/question_groups') && 
          response.request().method() === 'POST' &&
          response.status() === 201) {
        apiCallMade = true;
      }
    });
    
    await nameQuestionOptionDisabled.click();

    await page.waitForTimeout(1500);

    expect(apiCallMade).toBe(false);

    const questionCountAfter = await page.locator('[data-cy^="question-list-item-"]').count();
    expect(questionCountAfter).toBe(questionCountBefore);

    console.log('✓ Test passed: Name question created successfully and cannot be added again');
    console.log('✓ Verified that Name question option is disabled after first use');
  });

  test('should create Phone question and verify it cannot be added again', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    expect(await interventionPage.getSessionCount()).toBe(1);

    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await sessionPage.verifySessionPageLoaded();

    const addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    const questionTypeChooser = page.locator('[data-cy="question-type-chooser"]');
    await expect(questionTypeChooser).toBeVisible();

    const phoneQuestionOption = page.locator('[data-cy="question-type-phone"]');
    await expect(phoneQuestionOption).toBeVisible();
    await expect(phoneQuestionOption).not.toBeDisabled();

    const createQuestionPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await phoneQuestionOption.click();

    const response = await createQuestionPromise;
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toBeTruthy();
    expect(responseBody.data).toBeTruthy();

    const questionGroup = responseBody.data;
    expect(questionGroup.type).toBe('question_group');
    expect(questionGroup.attributes).toBeTruthy();

    await page.waitForTimeout(1000);

    const questionListItem = page.locator('[data-cy^="question-list-item-"]').first();
    await expect(questionListItem).toBeVisible({ timeout: 10000 });

    const questionDetails = page.locator('[data-cy="question-details"]');
    await expect(questionDetails).toBeVisible();

    await expect(questionDetails.getByText('Phone').first()).toBeVisible();

    await page.waitForTimeout(500);
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    await expect(questionTypeChooser).toBeVisible();

    const phoneQuestionOptionDisabled = page.locator('[data-cy="question-type-phone"]');
    await expect(phoneQuestionOptionDisabled).toBeVisible();

    const tooltipIcon = phoneQuestionOptionDisabled.locator('svg[alt="?"]');
    await expect(tooltipIcon).toBeVisible();

    await tooltipIcon.hover();

    await page.waitForTimeout(500);

    const tooltipMessage = page.getByText('This question is available only once per session');
    await expect(tooltipMessage).toBeVisible({ timeout: 5000 });

    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    const questionCountBefore = await page.locator('[data-cy^="question-list-item-"]').count();

    await addScreenButton.click();
    await expect(questionTypeChooser).toBeVisible();
    await phoneQuestionOptionDisabled.click();

    await page.waitForTimeout(1000);

    const questionCountAfter = await page.locator('[data-cy^="question-list-item-"]').count();
    expect(questionCountAfter).toBe(questionCountBefore);

    console.log('✓ Test passed: Phone question created successfully and cannot be added again');
    console.log('✓ Verified that Phone question option is disabled after first use');
  });

  test('should create TLFB group and verify it contains three questions', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    expect(await interventionPage.getSessionCount()).toBe(1);

    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await sessionPage.verifySessionPageLoaded();

    const addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    const questionTypeChooser = page.locator('[data-cy="question-type-chooser"]');
    await expect(questionTypeChooser).toBeVisible();

    const tlfbGroupOption = page.locator('[data-cy="question-type-tlfb"]');
    await expect(tlfbGroupOption).toBeVisible();

    await expect(tlfbGroupOption.getByText('Creates group')).toBeVisible();

    const createQuestionGroupPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await tlfbGroupOption.click();

    const response = await createQuestionGroupPromise;
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toBeTruthy();
    expect(responseBody.data).toBeTruthy();

    const questionGroup = responseBody.data;
    expect(questionGroup.type).toBe('question_group');
    expect(questionGroup.attributes.type).toBe('QuestionGroup::Tlfb');

    await page.waitForTimeout(2000);

    const questionListItems = page.locator('[data-cy^="question-list-item-"]');
    const questionCount = await questionListItems.count();
    expect(questionCount).toBeGreaterThanOrEqual(3);

    const questionsList = page.locator('[data-cy="questions-list"]');
    await expect(questionsList).toBeVisible();

    const configQuestion = questionsList.getByText('Config', { exact: true });
    await expect(configQuestion).toBeVisible();

    const eventsQuestion = questionsList.getByText('Events', { exact: true });
    await expect(eventsQuestion).toBeVisible();

    const questionsQuestion = questionsList.getByText('Questions', { exact: true });
    await expect(questionsQuestion).toBeVisible();

    await configQuestion.click();
    await page.waitForTimeout(500);
    const questionDetails = page.locator('[data-cy="question-details"]');
    await expect(questionDetails).toBeVisible();
    await expect(questionDetails.getByText('TLFB Config')).toBeVisible();

    await eventsQuestion.click();
    await page.waitForTimeout(500);
    await expect(questionDetails).toBeVisible();
    await expect(questionDetails.getByText('TLFB Events')).toBeVisible();

    await questionsQuestion.click();
    await page.waitForTimeout(500);
    await expect(questionDetails).toBeVisible();
    await expect(questionDetails.getByText('TLFB Questions')).toBeVisible();

    console.log('✓ Test passed: TLFB group created successfully with three questions');
    console.log('✓ Verified Config, Events, and Questions screens are present');
  });

  test('should create single answer question and then delete it', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    expect(await interventionPage.getSessionCount()).toBe(1);

    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await sessionPage.verifySessionPageLoaded();

    const addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    const questionTypeChooser = page.locator('[data-cy="question-type-chooser"]');
    await expect(questionTypeChooser).toBeVisible();

    const singleAnswerOption = page.locator('[data-cy="question-type-single"]');
    await expect(singleAnswerOption).toBeVisible();

    const createQuestionPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await singleAnswerOption.click();

    const response = await createQuestionPromise;
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toBeTruthy();
    expect(responseBody.data).toBeTruthy();

    const questionGroup = responseBody.data;
    expect(questionGroup.type).toBe('question_group');
    expect(questionGroup.attributes).toBeTruthy();

    await page.waitForTimeout(1000);

    const questionListItem = page.locator('[data-cy^="question-list-item-"]').first();
    await expect(questionListItem).toBeVisible({ timeout: 10000 });

    const questionItemId = await questionListItem.getAttribute('data-cy');
    expect(questionItemId).toBeTruthy();

    const questionCountBefore = await page.locator('[data-cy^="question-list-item-"]').count();
    expect(questionCountBefore).toBeGreaterThanOrEqual(1);

    const dropdownButton = questionListItem.locator('[id^="question-list-item-options-"]');
    await expect(dropdownButton).toBeVisible();
    await dropdownButton.click();

    await page.waitForTimeout(500);

    const deleteOption = page.getByText('Delete').last();
    await expect(deleteOption).toBeVisible();
    await deleteOption.click();

    await page.waitForTimeout(500);

    await expect(page.getByText('Do you want to delete this screen?')).toBeVisible();
    await expect(page.getByText('This operation is irreversible!')).toBeVisible();

    const deleteQuestionPromise = page.waitForResponse(
      (response) => {
        const url = response.url();
        const method = response.request().method();
        console.log(`API call: ${method} ${url}`);
        return url.includes('/delete_questions') &&
          method === 'DELETE';
      },
      { timeout: 15000 }
    );

    const confirmButtonByText = page.getByText('Confirm', { exact: false });
    const deleteButtonByText = page.getByText('Delete', { exact: false });

    if (await confirmButtonByText.isVisible({ timeout: 1000 }).catch(() => false)) {
      await confirmButtonByText.click();
    } else if (await deleteButtonByText.isVisible({ timeout: 1000 }).catch(() => false)) {
      await deleteButtonByText.click();
    } else {
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      for (let i = 0; i < buttonCount; i++) {
        const buttonText = await buttons.nth(i).textContent();
        if (buttonText && (buttonText.toLowerCase().includes('confirm') || buttonText.toLowerCase().includes('yes'))) {
          await buttons.nth(i).click();
          break;
        }
      }
    }

    const deleteResponse = await deleteQuestionPromise;
    expect(deleteResponse.status()).toBe(204);

    await page.waitForTimeout(1000);

    const questionCountAfter = await page.locator('[data-cy^="question-list-item-"]').count();
    expect(questionCountAfter).toBe(questionCountBefore - 1);

    const deletedQuestion = page.locator(`[data-cy="${questionItemId}"]`);
    await expect(deletedQuestion).not.toBeVisible();

    console.log('✓ Test passed: Successfully created and deleted single answer question');
    console.log('✓ Verified question was removed from the UI and API call was successful');
  });

  test('should create single answer question and duplicate it here', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    expect(await interventionPage.getSessionCount()).toBe(1);

    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await sessionPage.verifySessionPageLoaded();

    const addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    const questionTypeChooser = page.locator('[data-cy="question-type-chooser"]');
    await expect(questionTypeChooser).toBeVisible();

    const singleAnswerOption = page.locator('[data-cy="question-type-single"]');
    await expect(singleAnswerOption).toBeVisible();

    const createQuestionPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await singleAnswerOption.click();

    const response = await createQuestionPromise;
    expect(response.status()).toBe(201);

    await page.waitForTimeout(1000);

    const questionListItem = page.locator('[data-cy^="question-list-item-"]').first();
    await expect(questionListItem).toBeVisible({ timeout: 10000 });

    const questionCountBefore = await page.locator('[data-cy^="question-list-item-"]').count();
    expect(questionCountBefore).toBeGreaterThanOrEqual(1);

    const dropdownButton = questionListItem.locator('[id^="question-list-item-options-"]');
    await expect(dropdownButton).toBeVisible();
    await dropdownButton.click();

    await page.waitForTimeout(500);

    const duplicateHereOption = page.getByText('Duplicate here').last();
    await expect(duplicateHereOption).toBeVisible();

    const copyQuestionPromise = page.waitForResponse(
      (response) => {
        const url = response.url();
        const method = response.request().method();
        console.log(`API call: ${method} ${url}`);
        return url.includes('/clone') &&
          method === 'POST' &&
          response.status() === 201;
      },
      { timeout: 15000 }
    );

    await duplicateHereOption.click();

    const copyResponse = await copyQuestionPromise;
    expect(copyResponse.status()).toBe(201);

    const copyResponseBody = await copyResponse.json();
    expect(copyResponseBody).toBeTruthy();
    expect(copyResponseBody.data).toBeTruthy();

    await page.waitForTimeout(1000);

    const questionCountAfter = await page.locator('[data-cy^="question-list-item-"]').count();
    expect(questionCountAfter).toBe(questionCountBefore + 1);

    const allQuestions = page.locator('[data-cy^="question-list-item-"]');
    expect(await allQuestions.count()).toBe(questionCountBefore + 1);

    console.log('✓ Test passed: Successfully created and duplicated single answer question in the same group');
    console.log('✓ Verified duplicate was created via API and appears in the UI');
  });

  test('should create two sessions with questions and open duplicate internally modal', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSession1Response = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const session1Response = await createSession1Response;
    const session1Data = await session1Response.json();
    const session1Id = session1Data.data.id;

    const createSession2Response = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const session2Response = await createSession2Response;
    const session2Data = await session2Response.json();
    const session2Id = session2Data.data.id;

    expect(await interventionPage.getSessionCount()).toBe(2);

    await page.goto(`/interventions/${interventionId}/sessions/${session2Id}/edit`);
    await sessionPage.verifySessionPageLoaded();
    await page.waitForTimeout(1000);

    let addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    await page.locator('[data-cy="question-type-single"]').click();
    await page.waitForTimeout(1500);

    await page.goto(`/interventions/${interventionId}/sessions/${session1Id}/edit`);
    await sessionPage.verifySessionPageLoaded();

    addScreenButton = page.locator('[data-cy="add-screen-button"]');
    await expect(addScreenButton).toBeVisible();
    await addScreenButton.click();

    const questionTypeChooser = page.locator('[data-cy="question-type-chooser"]');
    await expect(questionTypeChooser).toBeVisible();

    const singleAnswerOption = page.locator('[data-cy="question-type-single"]');
    await expect(singleAnswerOption).toBeVisible();
    
    const createQuestionPromise = page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await singleAnswerOption.click();
    await createQuestionPromise;
    await page.waitForTimeout(1000);

    const questionListItem = page.locator('[data-cy^="question-list-item-"]').first();
    await expect(questionListItem).toBeVisible({ timeout: 10000 });

    const dropdownButton = questionListItem.locator('[id^="question-list-item-options-"]');
    await expect(dropdownButton).toBeVisible();
    await dropdownButton.click();

    await page.waitForTimeout(500);

    const duplicateInternallyOption = page.getByText('Duplicate internally').last();
    await expect(duplicateInternallyOption).toBeVisible();
    await duplicateInternallyOption.click();

    await page.waitForTimeout(1000);

    const modal = page.locator('[role="dialog"], .modal-content').first();
    await expect(modal).toBeVisible({ timeout: 5000 });

    await expect(page.getByText(/Select/i).first()).toBeVisible();

    const modalHasContent = await page.locator('[role="dialog"] button, [role="dialog"] [role="button"]').count();
    expect(modalHasContent).toBeGreaterThan(0);

    console.log('✓ Test passed: Successfully created two sessions and opened duplicate internally modal');
    console.log('✓ Verified modal is displayed with navigation options');
  });

  test('should create three questions with variables and set up branching to skip second question', async ({ page }) => {
    test.setTimeout(90000);
    
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const sessionPage = new SessionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    const interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    const createSessionResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');
    
    const sessionResponse = await createSessionResponse;
    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.data.id;

    expect(await interventionPage.getSessionCount()).toBe(1);

    await page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await sessionPage.verifySessionPageLoaded();

    await page.locator('[data-cy="add-screen-button"]').click();
    await page.locator('[data-cy="question-type-single"]').click();
    await page.waitForTimeout(1000);

    const titleContainer1 = page.locator('[data-cy="question-title-input"]');
    await expect(titleContainer1).toBeVisible();
    const titleEditor1 = titleContainer1.locator('.ql-editor[contenteditable="true"]');
    await expect(titleEditor1).toBeVisible();
    await titleEditor1.click();
    await titleEditor1.fill('Question 1: Branch Controller');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    const subtitleContainer1 = page.locator('[data-cy="question-subtitle-input"]');
    await expect(subtitleContainer1).toBeVisible();
    const subtitleEditor1 = subtitleContainer1.locator('.ql-editor[contenteditable="true"]');
    await expect(subtitleEditor1).toBeVisible();
    await subtitleEditor1.click();
    await subtitleEditor1.fill('This is the first question that controls branching logic');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    const variable1Container = page.locator('[data-cy^="question-variable-input-"]').first();
    await expect(variable1Container).toBeVisible();
    const variable1Input = variable1Container.locator('input').first();
    await variable1Input.click();
    await variable1Input.fill('var_1');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);

    const addAnswerButton = page.locator('[data-cy="add-answer-button"]');
    await expect(addAnswerButton).toBeVisible({ timeout: 10000 });
    await addAnswerButton.click();
    const answerInputs = page.locator('[data-cy^="answer-input-"] input');
    if (await answerInputs.count() > 1) {
      await answerInputs.nth(1).fill('Alternative answer');
      await answerInputs.nth(1).blur();
    }
    await page.waitForTimeout(500);

    await page.locator('[data-cy="add-screen-button"]').click();
    await page.locator('[data-cy="question-type-single"]').click();
    await page.waitForTimeout(1000);

    const titleContainer2 = page.locator('[data-cy="question-title-input"]');
    await expect(titleContainer2).toBeVisible();
    const titleEditor2 = titleContainer2.locator('.ql-editor[contenteditable="true"]');
    await expect(titleEditor2).toBeVisible();
    await titleEditor2.click();
    await titleEditor2.fill('Question 2: Should Be Skipped');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    const subtitleContainer2 = page.locator('[data-cy="question-subtitle-input"]');
    await expect(subtitleContainer2).toBeVisible();
    const subtitleEditor2 = subtitleContainer2.locator('.ql-editor[contenteditable="true"]');
    await expect(subtitleEditor2).toBeVisible();
    await subtitleEditor2.click();
    await subtitleEditor2.fill('This question should be skipped when var_1 equals 1');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    const variable2Container = page.locator('[data-cy^="question-variable-input-"]').nth(1);
    await expect(variable2Container).toBeVisible();
    const variable2Input = variable2Container.locator('input').first();
    await variable2Input.click();
    await variable2Input.fill('var_2');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);

    await page.locator('[data-cy="add-screen-button"]').click();
    await page.locator('[data-cy="question-type-single"]').click();
    await page.waitForTimeout(1000);

    const titleContainer3 = page.locator('[data-cy="question-title-input"]');
    await expect(titleContainer3).toBeVisible();
    const titleEditor3 = titleContainer3.locator('.ql-editor[contenteditable="true"]');
    await expect(titleEditor3).toBeVisible();
    await titleEditor3.click();
    await titleEditor3.fill('Question 3: Jump Target');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    const subtitleContainer3 = page.locator('[data-cy="question-subtitle-input"]');
    await expect(subtitleContainer3).toBeVisible();
    const subtitleEditor3 = subtitleContainer3.locator('.ql-editor[contenteditable="true"]');
    await expect(subtitleEditor3).toBeVisible();
    await subtitleEditor3.click();
    await subtitleEditor3.fill('This is the third question - the target of the branch when var_1 = 1');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    const variable3Container = page.locator('[data-cy^="question-variable-input-"]').nth(2);
    await expect(variable3Container).toBeVisible();
    const variable3Input = variable3Container.locator('input').first();
    await variable3Input.click();
    await variable3Input.fill('var_3');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);    
    const firstQuestion = page.locator('[data-cy^="question-list-item-"]').first();
    await firstQuestion.click();
    await page.waitForTimeout(1000);

    const branchingTab = page.locator('[data-cy="tabs"]').getByText('Branching');
    await expect(branchingTab).toBeVisible({ timeout: 10000 });
    await branchingTab.click();
    await page.waitForTimeout(1000);

    const formulaInput = page.locator('textarea[placeholder*="formula"], textarea[placeholder*="Formula"]').first();
    await expect(formulaInput).toBeVisible({ timeout: 10000 });
    await formulaInput.click();
    await formulaInput.fill('var_1');
    await formulaInput.blur();
    await page.waitForTimeout(500);

    const addCaseButton = page.getByText('+ Add case', { exact: false });
    await expect(addCaseButton).toBeVisible({ timeout: 5000 });
    await addCaseButton.click({ force: true });
    await page.waitForTimeout(1000);

    const caseValueInput1 = page.locator('[data-cy="case-value-input"]').first();
    await expect(caseValueInput1).toBeVisible({ timeout: 5000 });
    await caseValueInput1.click();
    await caseValueInput1.fill('1');
    await caseValueInput1.blur();
    await page.waitForTimeout(300);

    const selectQuestionButton1 = page.locator('[data-cy^="select-question-"]').first();
    await expect(selectQuestionButton1).toBeVisible({ timeout: 5000 });
    await selectQuestionButton1.click();
    await page.waitForTimeout(1000);

    const group1 = page.locator('[data-cy^="select-group-branching-"]').first();
    const groupCount = await group1.count();
    if (groupCount > 0) {
      const isGroupVisible = await group1.isVisible().catch(() => false);
      if (isGroupVisible) {
        await group1.click({ force: true }).catch(() => {
          // Ignore if click fails, group might already be expanded
        });
        await page.waitForTimeout(800);
      }
    }

    const questionOptions1 = page.locator('[data-cy^="choose-question-"]');
    await expect(questionOptions1).toHaveCount(3, { timeout: 5000 });

    const question3Selector = page.locator('[data-cy^="choose-question-3-"]');
    await expect(question3Selector).toBeVisible({ timeout: 5000 });
    await question3Selector.click();
    await page.waitForTimeout(500);

    await addCaseButton.click({ force: true });
    await page.waitForTimeout(1000);

    const caseValueInputs = page.locator('[data-cy="case-value-input"]');
    const caseValueInput2 = caseValueInputs.last();
    await expect(caseValueInput2).toBeVisible({ timeout: 5000 });
    await caseValueInput2.click();
    await caseValueInput2.fill('2');
    await caseValueInput2.blur();
    await page.waitForTimeout(300);

    const selectQuestionButtons = page.locator('[data-cy^="select-question-"]');
    const selectQuestionButton2 = selectQuestionButtons.last();
    await expect(selectQuestionButton2).toBeVisible({ timeout: 5000 });
    await selectQuestionButton2.click();
    await page.waitForTimeout(1000);

    const finishScreenOptions = page.locator('[data-cy^="select-finish-screen-"]');
    const visibleFinishScreen = finishScreenOptions.locator('visible=true').first();

    await finishScreenOptions.first().scrollIntoViewIfNeeded().catch(() => {
      // Ignore if scroll fails
    });
    await page.waitForTimeout(500);

    await visibleFinishScreen.click({ force: true });
    await page.waitForTimeout(500);

    await expect(formulaInput).toHaveValue('var_1');

    const case1Header = page.getByText('Case 1', { exact: false });
    await expect(case1Header).toBeVisible({ timeout: 5000 });

    const case2Header = page.getByText('Case 2', { exact: false });
    await expect(case2Header).toBeVisible({ timeout: 5000 });

    const caseSelects = page.locator('[data-cy="case-select"]');
    expect(await caseSelects.count()).toBeGreaterThanOrEqual(2);


    const previewButton = page.locator('[data-cy="open-preview-button"]');
    await expect(previewButton).toBeVisible({ timeout: 10000 });

    const [previewPage] = await Promise.all([
      page.context().waitForEvent('page'),
      previewButton.click()
    ]);
    
    await previewPage.waitForLoadState('domcontentloaded');
    await previewPage.waitForTimeout(2000);

    const startPreviewButton = previewPage.locator('[data-cy="start-preview-button"]');
    await expect(startPreviewButton).toBeVisible({ timeout: 15000 });
    await startPreviewButton.click();
    await previewPage.waitForTimeout(2000);

    const question1Title = previewPage.getByText('Question 1: Branch Controller', { exact: false });
    await expect(question1Title).toBeVisible({ timeout: 10000 });

    const firstAnswerOption = previewPage.locator('[data-cy="single-question-answer-0"]');
    await expect(firstAnswerOption).toBeVisible({ timeout: 10000 });
    await firstAnswerOption.click();
    await previewPage.waitForTimeout(500);

    const continueButton = previewPage.locator('button').filter({ 
      hasText: /Continue|Submit|Next/i 
    }).first();

    await expect(continueButton).toBeVisible({ timeout: 5000 });
    await continueButton.click();
    await previewPage.waitForTimeout(3000); // Wait longer for navigation

    const question3Title = previewPage.getByText('Question 3: Jump Target', { exact: false });
    await expect(question3Title).toBeVisible({ timeout: 10000 });
    
    const question3Description = previewPage.getByText('This is the third question - the target of the branch when var_1 = 1', { exact: false });
    await expect(question3Description).toBeVisible({ timeout: 5000 });

    const question2Title = previewPage.getByText('Question 2: Should Be Skipped', { exact: false });
    const question2Visible = await question2Title.isVisible().catch(() => false);
    expect(question2Visible).toBe(false);

    await previewPage.close();
  });
});
