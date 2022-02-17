import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledToast = styled.div`
	position: fixed;
  z-index: 9000;
  left: calc(100vw - 56%);
	bottom: 100px;
	padding: 10px 30px;
  border-radius: 10px;
	visibility: hidden;
	transition: .4s;
  opacity: 0;
  background-color: #4BB543;
	color: #fff;

	&.active {
		opacity: 1;
		visibility: visible;
  }

  @media (max-width: 500px) {
    left: calc(100vw - 75%);
  }
`;

const Toast = () => {
  const toastState = useSelector((state) => state.ui.toast);

  return (
    <StyledToast className={toastState.isShow ? 'active' : ''} >
      {toastState.message}
    </StyledToast>
  );
};

export default Toast;
