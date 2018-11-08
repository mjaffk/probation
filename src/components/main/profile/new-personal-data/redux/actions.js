import {
  CLEAN_STATUS, LOAD, START, UPDATE, DOWNLOAD_SNILS,
} from '../const';

export const loadPersonalData = () => ({
  type: LOAD + START,
});

export const updatePersonalData = () => ({
  type: UPDATE + START,
});

export const cleanStatusPersonalData = () => ({
  type: CLEAN_STATUS + START,
});

export const downloadSnils = () => ({
  type: DOWNLOAD_SNILS,
});
