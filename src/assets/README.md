## className 네이밍 규칙
① BEM (Block-Element-Modifier)
```
home__container
```
- Block: 컴포넌트의 전체 영역 (home)
- Element: Block 내부의 구성 요소 (container)
- Modifier: 상태나 변형 (is-active, -large)

✔️ 예시

```js
const Home = () => (
  <div className="home">
    <div className="home__container">
      <button className="home__button home__button--active">시작</button>
    </div>
  </div>
);
```