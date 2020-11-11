<template>
<div>
  <nav>
  <ul class="navbar flex">
    <li class="nav-link">
      <router-link to= '/Login' >Login</router-link>
    </li>
    <li class="nav-link">
      <router-link to= '/Register' >Register</router-link>
    </li>
    <li class="nav-link ml-auto">
      <router-link to="/"><img
            class="navbar-logo"
            src="../assets/pic/farawin-nav.png"
            alt="farawin"
          /></router-link>
    </li>
  </ul>
</nav>
<section class="home-section">
  <div class="top-div">
    <h1 class="top-title">Farawin board</h1>
    <h2 class="midd-title">helps teams work more collaboratively and get more done.</h2>
    <h2 class="fotter-title">Trello’s boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.</h2>
  </div>
  <div class="grid grid-rows-1 justify-center">
    <img class="img" src="../assets/pic/homePic.svg" alt="farawinBoard">
  </div>
  <div class="footer-div">
    <router-link to="/login" role="button" class="pg-login">Login</router-link>
    <router-link to="/register" class="pg-register">Register</router-link>

  </div>
</section>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>
<style lang="scss">
.navbar{
  background-color: #2951B6;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}
.nav-link{
  margin: 1rem;
  list-style-type: none;
  a{
    color: #fff;
    text-decoration: none;
    &:hover{
      color:  turquoise;
    }
  }
}
.navbar-logo {
  width: 50px;
  margin: 0;
  padding: 0;
  margin-left: auto;
}
.home-section{
  background-color: #2951B6;
  padding: 2rem;
  text-align: center;
  color: #fff;
}
.top-title{
  margin-top: 0;
  font-weight:bold;
  font-size: 40px;
}
.fotter-title{
font-size: medium;
}
.img{
  max-width: 100%;
  height: auto;
}
.footer-div{
  margin:3rem 0;
}
.pg-login{
  margin: 2rem;
  color: #fff;
  font-weight: bolder;
  text-decoration: none;
  padding: 1rem;
  background-color: rgb(255, 166, 0);
  border-radius: 8px;
  &:hover{
    background-color: rgb(0, 255, 200);
    color: #333;
  }
}
.pg-register{
  color: #fff;
  font-weight: bolder;
  text-decoration: none;
  padding: 1rem;
  background-color: rgb(255, 0, 0);
  border-radius: 8px;
  &:hover{
    background-color: rgb(0, 255, 200);
    color: #333;
  }
}
</style>
