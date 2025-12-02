import React, { useState, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import useDebounce from 'utils/useDebounce';
import { themeColors } from 'theme';

import Box from 'components/Box';
import ErrorAlert from 'components/ErrorAlert';
import Button from 'components/Button';
import Row from 'components/Row';
import messages from './messages';

type Tag = {
  id: string;
  name: string;
};

type TagOption = {
  value: string;
  label: string;
};

type Props = {
  interventionId: string;
  onClose: () => void;
  onSuccess?: () => void;
};

const TAGS_PER_REQUEST = 50;
const DEBOUNCE_DELAY = 500;

const AssignTagModal = ({ interventionId, onClose, onSuccess }: Props) => {
  const { formatMessage } = useIntl();
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [tagsError, setTagsError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreTags, setHasMoreTags] = useState(true);

  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  const fetchTags = useCallback(
    async (search = '', pageNumber = 0, append = false) => {
      setIsLoadingTags(true);
      setTagsError(null);

      try {
        const startIndex = pageNumber * TAGS_PER_REQUEST;
        const endIndex = startIndex + TAGS_PER_REQUEST;

        const params = new URLSearchParams({
          start_index: startIndex.toString(),
          end_index: endIndex.toString(),
        });

        if (search) {
          params.append('search', search);
        }

        const { data } = await axios.get(`/v1/tags?${params.toString()}`);
        const tags = jsonApiToArray(data, 'tag');
        const tagsSize = data.tags_size || 0;

        const options = tags.map((tag: Tag) => ({
          value: tag.id,
          label: tag.name,
        }));

        setTagOptions((prevOptions) =>
          append ? [...prevOptions, ...options] : options,
        );
        setHasMoreTags(endIndex < tagsSize);
      } catch (error) {
        setTagsError(formatMessage(messages.fetchTagsError));
      } finally {
        setIsLoadingTags(false);
      }
    },
    [formatMessage],
  );

  useEffect(() => {
    setCurrentPage(0);
    setHasMoreTags(true);
    fetchTags(debouncedInputValue, 0, false);
  }, [debouncedInputValue, fetchTags]);

  const handleInputChange = useCallback(
    (newInputValue: string, { action }: any) => {
      if (action === 'input-change') {
        setInputValue(newInputValue);
      } else if (action === 'menu-close') {
        setInputValue('');
      }
      return newInputValue;
    },
    [],
  );

  const handleChange = useCallback((newValue: any) => {
    setSelectedTags(newValue || []);
  }, []);

  const handleCreate = useCallback(
    (newTagName: string) => {
      const newOption: TagOption = {
        value: `new-${Date.now()}-${newTagName}`,
        label: newTagName,
      };
      setSelectedTags([...selectedTags, newOption]);
      setInputValue('');
      setCurrentPage(0);
      setHasMoreTags(true);
      fetchTags('', 0, false);
    },
    [selectedTags, fetchTags],
  );

  const handleMenuScrollToBottom = useCallback(() => {
    if (!isLoadingTags && hasMoreTags) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchTags(debouncedInputValue, nextPage, true);
    }
  }, [isLoadingTags, hasMoreTags, currentPage, debouncedInputValue, fetchTags]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);

    try {
      const tagIds: string[] = [];
      const names: string[] = [];

      selectedTags.forEach((tag) => {
        if (tag.value.startsWith('new-')) {
          names.push(tag.label);
        } else {
          tagIds.push(tag.value);
        }
      });

      const requestBody = {
        tag: {
          tag_ids: tagIds,
          names,
        },
      };

      await axios.post(
        `/v1/interventions/${interventionId}/tags/assign`,
        requestBody,
      );

      toast.success(formatMessage(messages.assignTagsSuccess));

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      toast.error(formatMessage(messages.assignTagsError));
    } finally {
      setIsSaving(false);
    }
  }, [selectedTags, interventionId, formatMessage, onClose, onSuccess]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: '1px',
      borderRadius: '5px',
      borderColor: state.isFocused
        ? themeColors.primary
        : themeColors.highlight,
      '&:hover': {
        borderColor: state.isFocused
          ? themeColors.primary
          : themeColors.highlight,
      },
      boxShadow: '0',
      minHeight: '45px',
      width: '100%',
      cursor: 'pointer',
    }),
    menu: (provided: any) => ({
      ...provided,
      maxHeight: '250px',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '250px',
    }),
    menuPortal: (provided: any) => ({ ...provided, zIndex: 999 }),
  };

  if (tagsError) {
    return (
      <Box p={20}>
        <ErrorAlert errorText={tagsError} />
      </Box>
    );
  }

  return (
    <Box p={20}>
      <Box mb={20}>
        <CreatableSelect
          isMulti
          options={tagOptions}
          value={selectedTags}
          inputValue={inputValue}
          onChange={handleChange}
          onInputChange={handleInputChange}
          onCreateOption={handleCreate}
          onMenuScrollToBottom={handleMenuScrollToBottom}
          placeholder={formatMessage(messages.selectTagsPlaceholder)}
          isLoading={isLoadingTags}
          isClearable
          isSearchable
          noOptionsMessage={() => formatMessage(messages.noTagsFound)}
          formatCreateLabel={(tagName: string) =>
            formatMessage(messages.createNewTag, { name: tagName })
          }
          styles={customStyles}
          menuPortalTarget={document.body}
          menuPlacement="auto"
          closeMenuOnSelect={false}
        />
      </Box>

      <Row justify="end" gap={10}>
        <Button onClick={onClose} disabled={isSaving} inverted>
          {formatMessage(messages.cancel)}
        </Button>
        <Button onClick={handleSave} loading={isSaving} disabled={isSaving}>
          {formatMessage(messages.save)}
        </Button>
      </Row>
    </Box>
  );
};

export default AssignTagModal;
export { ASSIGN_TAG_MODAL_WIDTH } from './constants';
