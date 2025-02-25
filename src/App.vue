<template>
  <router-view/>
</template>

<style>
*{
      box-sizing: border-box;
  }
  /* html{
        scroll-behavior: smooth;
        display: flex;
        justify-content: center;
        font-size: 16px;
    } */
    body{
        width: 100%;
        margin: 0;
        font-family: varela-round;
        font-size: 1rem;
        min-width: 250px;
        max-width: 2500px;
    }
    ::-webkit-scrollbar{
        width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb{
        background: var(--navy);
    }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
