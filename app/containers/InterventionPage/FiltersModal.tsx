import React, { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { VscSettings } from 'react-icons/vsc';

import { SharingFilter } from 'models/Intervention/SharingFilter';
import { MAIN_DASHBOARD_FILTER_DATA_INITIAL_VALUE } from 'global/reducers/interventions';

import { Button } from 'components/Button';
import Modal from 'components/Modal';
import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';

import ShareFilter from './ShareFilter';
import StatusFilter from './StatusFilter';
import { SharedFilter } from './StarredFilter';
import TagFilter from './TagFilter';
import messages from './messages';

type FilterData = {
  sharing: SharingFilter | null;
  statuses: string[];
  starred: boolean;
  tagIds: string[];
};

type Props = {
  currentFilters: FilterData;
  onApplyFilters: (filters: FilterData) => void;
};

const FiltersModal: FC<Props> = ({ currentFilters, onApplyFilters }) => {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterData>(currentFilters);

  const handleOpen = () => {
    setLocalFilters(currentFilters);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterData = {
      sharing: MAIN_DASHBOARD_FILTER_DATA_INITIAL_VALUE.sharing,
      statuses: MAIN_DASHBOARD_FILTER_DATA_INITIAL_VALUE.statuses,
      starred: MAIN_DASHBOARD_FILTER_DATA_INITIAL_VALUE.starred,
      tagIds: MAIN_DASHBOARD_FILTER_DATA_INITIAL_VALUE.tagIds,
    };
    setLocalFilters(clearedFilters);
  };

  const handleSharingChange = (value: string | null) => {
    setLocalFilters({
      ...localFilters,
      sharing: value as SharingFilter | null,
    });
  };

  const handleStatusesChange = (value: string[]) => {
    setLocalFilters({ ...localFilters, statuses: value });
  };

  const handleStarredChange = (value: boolean) => {
    setLocalFilters({ ...localFilters, starred: value });
  };

  const handleTagIdsChange = (value: string[]) => {
    setLocalFilters({ ...localFilters, tagIds: value });
  };

  const SettingsIcon = VscSettings as React.ComponentType<{
    size?: number;
    color?: string;
  }>;

  return (
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        width="auto"
        px={16}
        py={10}
        aria-label={formatMessage(messages.filtersModalTitle)}
        buttonProps={{
          display: 'flex',
          align: 'center',
          gap: 8,
          color: 'white',
        }}
      >
        <SettingsIcon size={20} color="white" />
        {formatMessage(messages.filtersButton)}
      </Button>

      <Modal
        visible={isOpen}
        onClose={handleClose}
        title={formatMessage(messages.filtersModalTitle)}
        maxWidth="600px"
      >
        <Box padding={20}>
          <Box mb={20}>
            <Text fontWeight="bold" mb={8}>
              {formatMessage(messages.shareFilterLabel)}
            </Text>
            <ShareFilter
              formatMessage={formatMessage}
              onChange={handleSharingChange}
              active={localFilters.sharing}
            />
          </Box>

          <Box mb={20}>
            <Text fontWeight="bold" mb={8}>
              {formatMessage(messages.statusFilterLabel)}
            </Text>
            <StatusFilter
              formatMessage={formatMessage}
              onChange={handleStatusesChange}
              active={localFilters.statuses}
            />
          </Box>

          <Box mb={20}>
            <SharedFilter
              value={localFilters.starred}
              onChange={handleStarredChange}
            />
          </Box>

          <Box mb={20}>
            <Text fontWeight="bold" mb={8}>
              {formatMessage(messages.tagFilterLabel)}
            </Text>
            <TagFilter
              formatMessage={formatMessage}
              onChange={handleTagIdsChange}
              active={localFilters.tagIds}
            />
          </Box>

          <Row justify="end" gap={12} mt={24}>
            <Button
              onClick={handleClearFilters}
              variant="secondary"
              buttonProps={{ mr: 8 }}
            >
              {formatMessage(messages.clearFilters)}
            </Button>
            <Button onClick={handleApply} variant="primary">
              {formatMessage(messages.applyFilters)}
            </Button>
          </Row>
        </Box>
      </Modal>
    </>
  );
};

export default FiltersModal;
