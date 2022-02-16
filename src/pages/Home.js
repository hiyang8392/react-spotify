import { useSelector, useDispatch } from "react-redux";
import { recommendActions } from "../store/recommend";
import styled from "styled-components";
import RecommendList from "../components/RecommendList";

const Section = styled.section`
  color: #fff;

  h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }  
`;

const Home = () => {
  const dispatch = useDispatch();
  const recommends = useSelector((state) => state.recommend.recommends);
  const date = new Date();
  const nowHour = date.getHours();
  let title = '早安';

  if (nowHour > 17 || nowHour < 5) {
    title = '晚安';
  } else if (nowHour > 11) {
    title = '午安';
  }

  if (recommends.length === 0) {
    dispatch(recommendActions.getRecommends());
  }

  const recommendList = recommends.map((recommend) => {
    return (
      <RecommendList 
        key={recommend.id}
        image={recommend.image}
        title={recommend.title}
        type={recommend.type}
        items={recommend.items}
      />
    );
  });

  return (
    <Section>
      <h1>{title} ~</h1>
      {recommendList}
    </Section>
  );
};

export default Home;
