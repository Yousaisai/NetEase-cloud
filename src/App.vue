<template>
  <div  id="app">
    <router-view/>
  </div>
</template>

<style>
/* @import "./style/icon/iconfont.css"; */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body{
  width: 100vw;
  margin: 0;
  height: 100vh;
}
</style>
