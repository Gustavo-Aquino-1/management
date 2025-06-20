import { BadRequestException } from '@nestjs/common';

type grFilterSring = {
  isInsensitive: boolean;
  inStart: boolean;
};

const baseConfigFilterString = {
  isInsensitive: true,
  inStart: false,
};

const generateFilterString = (
  searchItem,
  fieldName,
  { isInsensitive, inStart }: grFilterSring,
) => {
  let filters = {};
  const place = inStart ? 'startsWith' : 'contains';
  filters[place] = searchItem;
  // if (isInsensitive) filters['mode'] = 'insensitive';
  return filters;
};

const generateFilterNum = (searchItem, fieldName, filters) => {
  if (isNaN(+String(searchItem).trim())) {
    throw new BadRequestException({
      message: `${fieldName} should be a number`,
    });
  }
  return +searchItem;
};

const generateFilterEnum = (searchItem, fieldName, filters) => {
  return searchItem;
};

const generateFilterDate = (searchItem, fieldName, filters) => {
  const regex =
    /^(?:(?:19|20)\d{2})-(?:(?:0[13578]|1[02] )-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|02-(?:0[1-9]|1\d|2[0-8]))$/;
  const [date1, date2] = searchItem.split('_');

  if (!regex.test(date1))
    throw new BadRequestException({ message: 'Expected format: YYYY-MM-DD' });
  if (date2?.length > 1 && !regex.test(date2)) {
    throw new BadRequestException({ message: 'Expected format: YYYY-MM-DD' });
  }

  return {
    gte: new Date(date1 + 'T00:00:00.000Z'),
    lte: new Date(date2 ? date2 : date1 + 'T23:59:59.999Z'),
  };
};

export {
  // generateFilterDate,
  generateFilterString,
  generateFilterNum,
  baseConfigFilterString,
  generateFilterEnum,
  generateFilterDate,
};
