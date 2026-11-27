import { useEffect, useState } from 'react';

import { ParticipantUploadConfig } from 'models/ParticipantUpload';

import { fetchParticipantUploadConfig } from 'utils/participantUploads';

export const useParticipantUploadConfig =
  (): Nullable<ParticipantUploadConfig> => {
    const [config, setConfig] =
      useState<Nullable<ParticipantUploadConfig>>(null);

    useEffect(() => {
      let cancelled = false;

      fetchParticipantUploadConfig()
        .then((loaded) => {
          if (!cancelled) setConfig(loaded);
        })
        .catch(() => {});

      return () => {
        cancelled = true;
      };
    }, []);

    return config;
  };
