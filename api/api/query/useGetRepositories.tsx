import { useInfiniteQuery } from '@tanstack/react-query';
import { getHttpClient } from '../axios';
import { ApiResponsePaginated } from '@/types/api';
import { Repository } from '@/types/repository';

export const useGetRepositories = (userLogin: string) =>
  useInfiniteQuery({
    queryKey: ['useGetRepositories', userLogin],
    queryFn: queryFnParams =>
      getRepositories({ pageParam: queryFnParams.pageParam || 1, userLogin }),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
  });

export const getRepositories = async ({
  pageParam = 1,
  userLogin,
}: {
  pageParam: number;
  userLogin: string;
}): Promise<ApiResponsePaginated<Repository[]>> => {
  const response = await getHttpClient().get<unknown, Repository[]>(
    `users/${userLogin}/repos`,
    {
      params: {
        per_page: 5,
        page: pageParam,
      },
    },
  );

  return {
    items: response,
    nextPage: response.length === 5 ? pageParam + 1 : undefined,
  };
};
