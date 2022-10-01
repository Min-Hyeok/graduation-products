import { css } from 'styled-components';

const animation = css`
  /*
    공통 팝업 컴포넌트 fade in 애니메이션
  */
  @keyframes popup {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /*
    공통 팝업 컴포넌트 content 영역 애니메이션
  */
  @keyframes popupContent {
    from {
      transform: translateX(-50%) translateY(50%);
    }
    to {
      transform: translateX(-50%) translateY(-50%);
    }
  }
`;

export default animation;
