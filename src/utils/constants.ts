const PLANDAR_CUSTOM_REPSOITORY = 'PLANDAR_CUSTOM_REPSOITORY';

const ENV_PROVIDER = 'ENV_PROVIDER';

const IS_PUBLIC_KEY = 'isPublic';

const CATEGORY_SELECT = {
  id: true,
  name: true,
  color: true,
};

const PLAN_SELECT = {
  id: true,
  title: true,
  description: true,
  color: true,
  isAllDay: true,
  type: true,
  startTime: true,
  endTime: true,
  categoryId: true,
  tags: {
    id: true,
    name: true,
  },
};

export {
  PLANDAR_CUSTOM_REPSOITORY,
  ENV_PROVIDER,
  IS_PUBLIC_KEY,
  CATEGORY_SELECT,
  PLAN_SELECT,
};
