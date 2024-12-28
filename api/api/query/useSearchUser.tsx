import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getHttpClient } from '../axios';
import { ApiResponse } from '@/types/api';
import { User } from '@/types/user';

export const useSearchUser = (searchPhrase: string) =>
  useQuery({
    queryKey: ['useSearchUser', searchPhrase],
    queryFn: () => searchUser(searchPhrase),
    placeholderData: keepPreviousData,
    enabled: false,
  });

export const searchUser = async (
  searchPhrase: string,
): Promise<ApiResponse<User[]>> =>
  await getHttpClient().get<unknown, ApiResponse<User[]>>(
    `search/users?q=${searchPhrase}&per_page=5&page=1`,
  );
