import styled from "styled-components";
import Item from "./Item";

const StyledRecommendList = styled.div`
  .items {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
`;

const RecommendList = (props) => {
  const item = props.items.map((item) => {
    return (
      <Item 
        key={item.id}
        id={item.id}
        type={props.type}
        image={item.image}
        title={item.title}
        info={item.info}
      />
    );
  });
  
  return (
    <StyledRecommendList>
      <h2>{props.title}</h2>
      <ul className="items">{item}</ul>
    </StyledRecommendList>
  );
};

export default RecommendList;
