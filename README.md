# thumble

### 기술 스택
React + Antd + Ag-grid

### 레이아웃 적용
* css/grid.css 를 참고
* 페이지 스크롤바를 사용하지 않기 때문에 화면안의 모든 UI 컴포넌트는 창 크기에 맞게 자동으로 100% 늘려지고 줄어들어야 합니다.
* 이와 같은 레이아웃을 위해서 컨테이너 높이를 꽉 채워야 하는 상황에는 아래 규칙대로 클래스명을 적용합니다.

+ v-grid: 박스 한개 인 경우
+ v-grid-hmf: 헤더 - 메인 - 푸터 형식이고 헤더와 푸터는 고정이지만, 메인은 높이를 꽉 채워야 하는 경우
+ v-grid-hm: 헤더 - 메인
+ v-grid-mf: 메인 - 푸터

