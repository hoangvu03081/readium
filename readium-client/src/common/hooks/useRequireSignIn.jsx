import { useSelector, useDispatch } from "react-redux";

export default function useRequireSignIn() {
  const isModalOpened = useSelector((state) => state.signInModal);
  const dispatch = useDispatch();
}
