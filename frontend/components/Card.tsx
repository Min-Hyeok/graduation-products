import styled from 'styled-components';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--white-color);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  z-index: 0;
`;

const ImageSlide = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;

  :hover {
    button {
      opacity: 1;
    }
  }

  > div {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    box-sizing: border-box;

    > button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;

      > svg {
        font-size: 22px;
      }
    }
  }

  > img {
    max-width: 100%;
  }
`;

const Info = styled.div`
  padding: 0 10px 10px;
  box-sizing: border-box;
  font-size: 15px;

  > h2 {
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 5px;
  }
`;

interface CardType {
  item: AnimalList;
}

const Card = ({ item }: CardType) => {
  const {
    images, title, varieties, age, price,
  }: AnimalList = item;

  return (
    <Wrapper>
      <ImageSlide>
        <div>
          <button type="button">
            <BsArrowLeftShort />
          </button>
          <button type="button">
            <BsArrowRightShort />
          </button>
        </div>
        {images.map((src) => (
          <img src={src} alt="" />
        ))}
      </ImageSlide>
      <Info>
        <h2>{title}</h2>
        <span>
          {varieties}
          /
          {age}
          살
        </span>
        <p>{price ? `${price}원` : '무료'}</p>
      </Info>
    </Wrapper>
  );
};

export default Card;
