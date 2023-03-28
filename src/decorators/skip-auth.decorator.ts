import { SetMetadata } from '@nestjs/common';

const IS_PUBLIC_KEY = 'isPublic';
const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export { Public, IS_PUBLIC_KEY };
