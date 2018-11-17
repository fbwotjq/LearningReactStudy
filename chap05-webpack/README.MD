 * 웹팩 전역 설치
    - console> sudo npm install -g webpack
 * 프로젝트 시작
    - console> npm init 
 * 웹팩에서 번들링 할때 사용할 라이브러리 설치
    - console> npm install babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 --save-dev
 * 프로젝트에서 사용하는 라이브러리 설치
    - console> npm install react react-dom --save
 * dist/index.html 파일 생성
 * src/index.js 파일 생성
 * webpack.config.js 파일 생성
 * chap05/example04.html코드를 webpack으로 전환 시작
    - Menu 컴포넌트 화
 * webpack을 통한 번들링
    - console> webpack --> dist/assets/bundle.js 파일 생성
 * css 번들링 포함
    - console> npm install style-loader css-loader postcss-loader autoprefixer --save-dev
    - webpack.config.js 추가