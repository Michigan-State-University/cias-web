import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Col } from 'react-grid-system';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import useDebounce from 'utils/useDebounce';

import SelectComponent from 'components/Select';
import messages from './messages';

const Select = SelectComponent as any;

type Tag = {
  id: string;
  name: string;
};

type TagOption = {
  value: string;
  label: string;
};

type Props = {
  formatMessage: (message: any) => string;
  onChange: (tagIds: string[]) => void;
  active: string[];
};

const TAGS_PER_REQUEST = 50;
const DEBOUNCE_DELAY = 500;

const TagFilter: React.FC<Props> = ({ formatMessage, onChange, active }) => {
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [selectedTagsCache, setSelectedTagsCache] = useState<TagOption[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreTags, setHasMoreTags] = useState(true);

  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  const fetchTags = useCallback(
    async (search = '', pageNumber = 0, append = false) => {
      setIsLoadingTags(true);

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

        setTagOptions((prevOptions) => {
          const newOptions = append ? [...prevOptions, ...options] : options;
          const mergedOptions = [...newOptions];
          selectedTagsCache.forEach((selectedTag) => {
            if (!mergedOptions.find((opt) => opt.value === selectedTag.value)) {
              mergedOptions.unshift(selectedTag);
            }
          });
          return mergedOptions;
        });
        setHasMoreTags(endIndex < tagsSize);
      } catch (error) {
        // Error fetching tags - silently fail
      } finally {
        setIsLoadingTags(false);
      }
    },
    [selectedTagsCache],
  );

  useEffect(() => {
    setCurrentPage(0);
    setHasMoreTags(true);
    fetchTags(debouncedInputValue, 0, false);
  }, [debouncedInputValue, fetchTags]);

  useEffect(() => {
    if (active && active.length > 0 && selectedTagsCache.length === 0) {
      const initialSelectedTags = tagOptions.filter((option) =>
        active.includes(option.value),
      );
      if (initialSelectedTags.length > 0) {
        setSelectedTagsCache(initialSelectedTags);
      }
    }
  }, [active, tagOptions, selectedTagsCache.length]);

  const handleMenuScrollToBottom = useCallback(() => {
    if (!isLoadingTags && hasMoreTags) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchTags(debouncedInputValue, nextPage, true);
    }
  }, [isLoadingTags, hasMoreTags, currentPage, debouncedInputValue, fetchTags]);

  const handleInputChange = useCallback((newInputValue: string) => {
    setInputValue(newInputValue);
    return newInputValue;
  }, []);

  const selectValue = useMemo(
    () => tagOptions.filter((option) => active?.includes(option.value)),
    [tagOptions, active],
  );

  const handleChange = (values: TagOption[] | null) => {
    const selectedValues = values || [];
    setSelectedTagsCache(selectedValues);
    onChange(selectedValues.map(({ value }) => value));
  };

  return (
    <Col>
      <Select
        selectProps={{
          isMulti: true,
          options: tagOptions,
          formatLabel: (label: string) => label,
          value: selectValue,
          onChange: handleChange,
          placeholder: formatMessage(messages.tagFilterPlaceholder),
          isLoading: isLoadingTags,
          onInputChange: handleInputChange,
          inputValue,
          onMenuScrollToBottom: handleMenuScrollToBottom,
          isSearchable: true,
          isClearable: true,
          noOptionsMessage: () => formatMessage(messages.noTagsFound),
        }}
      />
    </Col>
  );
};

export default TagFilter;
