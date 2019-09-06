<template>
    <div class="footer">
        <router-link to='/home'>
            <p class="p1" :class="router==='/home'?'color':''">
                <img v-if="router!=='/home'" src="./img/wuye.png" alt="">
                <img v-if="router==='/home'" src="./img/wuye1.png" alt="">
                <span>物业</span>
            </p>
        </router-link>
        <!--<router-link to='/'>-->
            <!--<p class="p2" :class="router==='/'?'color':''">-->
                <!--<img v-if="router!=='/'" src="./img/shequ.png" alt="">-->
                <!--<img v-if="router==='/'" src="./img/shequ1.png" alt="">-->
                <!--<span>社区</span>-->
            <!--</p>-->
        <!--</router-link>-->
        <router-link to='/user'>
            <p class="p3" :class="router==='/user'?'color':''">
                <img v-if="router!=='/user'" src="./img/wode.png" alt="">
                <img v-if="router==='/user'" src="./img/wode1.png" alt="">
                <span>我的</span>
            </p>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "footer-box",
        data() {
            return {
                router: '/home'
            }
        },
        created() {
            this.router = this.$route.path;
        }
    }
</script>

<style scoped>
    .footer {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 0.2rem 0;
        background: #ffffff;
        box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.19);
    }

    .footer a {
        width: 50%;
        text-align: center;
        color: #333;
    }

    .footer .color {
        color: #05ba8b;
    }

    .footer p{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .footer p img {
        width: 0.3rem;
        height: 0.3rem;
    }

    .footer .p1 img{
        width: 0.4rem;
        height: 0.4rem;
    }

    .footer p span{
        margin-left: 0.05rem;
        position: relative;
        top: 0.02rem;
    }
</style>