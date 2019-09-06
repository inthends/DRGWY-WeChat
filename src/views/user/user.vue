<template>
    <div class="user">
        <div class="header">
            <div class="header-left">
                <img src="./img/1.jpg" alt="">
                <div class="header-left-cont">
                    <p class="header-left-cont-p">1123213131312</p>
                    <div class="header-left-cont-p-cont">
                        <img src="./img/zuanshi.png" alt="">
                        <p>0.11</p>
                    </div>
                </div>
            </div>
            <van-icon name="arrow" color="#666"/>
        </div>
        <div class="swipe">
            <van-swipe :autoplay="3000" indicator-color="transparent">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img :src="image"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="shequ">
            <div class="shequ-title shequ-title-c11">
                <div class="shequ-title-1">
                    <span></span>
                    <p>我的权益</p>
                </div>
            </div>

            <div class="img-list">
                <div class="img-list-flex">
                    <p>积分</p>
                    <p>10</p>
                </div>

                <div class="img-list-flex">
                    <p>工单</p>
                    <p>12312</p>
                </div>

                <div class="img-list-flex">
                    <p>账单</p>
                    <p>1</p>
                </div>

                <div class="img-list-flex">
                    <p>发票</p>
                    <p>131231</p>
                </div>
            </div>
        </div>

        <Footer-box></Footer-box>
    </div>
</template>

<script>
    import Footer from '../../components/footer.vue'

    export default {
        name: "user",
        components: {
            'Footer-box': Footer
        },
        data() {
            return {
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ]
            }
        },
        created() {
        },
    }
</script>

<style scoped>
    .user {
        padding-bottom: 1.2rem;
    }

    .swipe {
        margin-top: 0.2rem;
        padding: 0.2rem;
        background: #fff;
    }

    .swipe img {
        width: 100%;
        height: 2rem;
    }

    .img-list {
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        background: #fff;
        box-sizing: border-box;
        display: flex;
        margin-top: 0.2rem;
    }

    .img-list-flex {
        width: 25%;
        text-align: center;
    }

    .img-list-flex img {
        width: 0.8rem;
        height: 0.8rem;
    }

    .img-list-flex p {
        font-size: 0.28rem;
        color: #333;
    }

    .img-list-flex p:last-child{
        font-size: 0.24rem;
        color: #666;
        margin-top: 0.1rem;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0.4rem;
        background: #fff;
    }

    .header-left {
        display: flex;
        align-items: center;
    }

    .header-left img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        margin-right: 0.2rem;
    }

    .header-left-cont-p-cont {
        display: flex;
        align-items: center;
    }

    .header-left-cont-p-cont img {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.05rem;
    }

    .shequ {
        margin-top: 0.2rem;
        background: #fff;
    }

    .shequ-title {
        display: flex;
        align-items: center;
        padding: 0.2rem;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 0.2rem;
    }

    .shequ-title span {
        width: 0.1rem;
        height: 0.3rem;
        display: inline-block;
        background: #05ba8b;
        margin-right: 0.1rem;
    }

    .list-shequ-cont1 {
        display: flex;
        margin-bottom: 0.2rem;
        justify-content: space-between;
    }

    .list-shequ-cont1 p:last-child {
        color: #ba1914;
    }

    .list-shequ-cont {
        width: 40%;
        padding: 0.3rem 0.2rem;
        border-radius: 0.1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.19);
        margin: 0.2rem;
        background: #fff;
        box-sizing: border-box;
    }

    .list-shequ-cont p {
        font-size: 0.24rem;
        color: #333;
    }

    .list-shequ {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .list-xiangmu-cont {
        display: flex;
        align-items: center;
        padding: 0.3rem;
        border-bottom: 1px solid #f1f1f1;
        margin: 0 0.2rem;
    }
    .shequ-title-c11 {
        justify-content: space-between;
    }

    .shequ-title-1 {
        display: flex;
        align-items: center;

    }
    
    .header-left-cont-p-cont p{
        color: #666;
        font-size: 0.24rem;
    }

    .header-left-cont {

    }

    .header-left-cont-p {
        margin-bottom: 0.1rem;
        color: #333;
        font-size: 0.3rem;
    }
</style>