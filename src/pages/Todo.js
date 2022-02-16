import styled from "styled-components";
import { FaSnowboarding } from "react-icons/fa";

const StyledTodo = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 36px;

  p,
  svg {
    margin-left: 0;
  }

  svg {
    transform: rotate(-50deg);
    animation-name: "skate";
    animation-duration: 3s;
    animation-fill-mode: forwards;
  }

  @keyframes skate {
    0% {
      margin-left: 0;
    }
    20% {
      transform: rotate(-20deg);
    }
    40% {
      transform: rotate(-50deg);
    }
    80% {
      transform: rotate(-200deg);
    }
    100% {
      margin-left: 500px;
      transform: rotate(-200deg);
      opacity: 0;
    }
  }
`;

const Todo = () => {
  return (
    <StyledTodo>
      <p>施工中... </p>
      <FaSnowboarding />
    </StyledTodo>
  );
};

export default Todo;
