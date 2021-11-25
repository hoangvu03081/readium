import { useMemo } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import queryString from "query-string";

export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  return useMemo(
    () => ({
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      match,
      location,
      history,
      Redirect,
    }),
    [params, match, location, history]
  );
}
