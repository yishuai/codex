
import { useQuery } from '@tanstack/react-query'
import { getPerceive } from '../api'

export function useLivePerceive(enabled=true) {
  return useQuery({
    queryKey: ['perceive'],
    queryFn: getPerceive,
    refetchInterval: enabled ? 5000 : false,
    staleTime: 2000
  })
}
