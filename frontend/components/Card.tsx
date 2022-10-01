import styled from 'styled-components';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

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
  margin-bottom: 10px;
  width: 100%;

  :hover {
    > div:nth-child(1) {
      > button {
        opacity: 1;
        transition: opacity 0.3s;
      }
    }
  }

  > div {
    :nth-child(1) {
      position: absolute;
      width: 100%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      box-sizing: border-box;
      z-index: 1;

      > button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        opacity: 0;

        > svg {
          font-size: 22px;
        }
      }
    }

    :nth-child(2) {
      display: flex;
      width: 100%;
      height: 280px;
      overflow: hidden;
      position: relative;
      z-index: 0;

      > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
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

  > p {
    margin-bottom: 10px;
  }
`;

interface CardType {
  item: AnimalList;
  loading: boolean;
}

const Card = ({ item, loading }: CardType) => {
  const {
    images, title, varieties, age, price, index,
  }: AnimalList = item;
  const [priceText, setPriceText] = useState('');
  const [ageText, setAgeText] = useState('');

  useEffect(() => {
    setPriceText(`${price ? `${Intl.NumberFormat('ko-KR').format(price)}원` : '무료'}`);

    if (varieties && age) {
      setAgeText(`${varieties} / ${age}살`);
    }
  }, [age, price, varieties]);

  return (
    <Wrapper key={index}>
      <ImageSlide>
        <div>
          <button type="button">
            <BsArrowLeftShort />
          </button>
          <button type="button">
            <BsArrowRightShort />
          </button>
        </div>
        <div>
          {loading && (
            <Skeleton style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            />
          )}
          {images.map((src, imagesIndex) => (
            <img src={src} alt="" key={imagesIndex} />
          ))}
        </div>
      </ImageSlide>
      <Info>
        <h2>{loading ? <Skeleton /> : title}</h2>
        <p>{loading ? <Skeleton /> : ageText}</p>
        <p>{loading ? <Skeleton /> : priceText}</p>
      </Info>
    </Wrapper>
  );
};

export default Card;
