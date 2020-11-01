<template>
<div>
  <nav>
  <ul class="navbar">
    <li class="nav-link">
      <router-link to= '/Login' >Login</router-link>
    </li>
    <li class="nav-link">
      <router-link to= '/Register' >Register</router-link>
    </li>
    <li class="nav-link navbar-logo">
      <router-link to="/"><h1 class="nav-logo">Farawin</h1></router-link>
    </li>
  </ul>
</nav>
<section class="home-section">
  <div class="top-div">
    <h1 class="top-title">Farawin board</h1>
    <h2 class="midd-title">helps teams work more collaboratively and get more done.</h2>
    <h2 class="fotter-title">Trello’s boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.</h2>
  </div>
  <div class="center-div">
    <img class="img" src="../assets/homePic.svg" alt="farawinBord">
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
.navbar-logo{
  margin-left: auto;
}
.nav-logo{
  margin: 0;
  font-style: italic;
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
