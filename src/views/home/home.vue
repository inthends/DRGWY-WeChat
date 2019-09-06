<template>
    <div class="home">
        <div class="header">
            <div class="header-img">
                <img src="./img/1.jpg" alt="">
            </div>
            <div class="name">
                <p>郭斌</p>
            </div>
            <div class="balance">
                <van-icon name="balance-o" color="#fff"/>
                <span>0.00</span>
            </div>
            <div class="qr">
                <van-icon size="20px" name="qr" color="#fff"/>
                <p>兑换码</p>
                <van-icon name="arrow-down" color="#fff"/>
            </div>
        </div>

        <div class="img-list">
            <div class="img-list-flex" @click="payFees()">
                <img src="./img/jiaofei.png" alt="">
                <p>查询缴费</p>
            </div>

            <div class="img-list-flex">
                <img src="./img/xiu.png" alt="">
                <p>报事报修</p>
            </div>

            <div class="img-list-flex">
                <img src="./img/guanjia.png" alt="">
                <p>在线管家</p>
            </div>

            <div class="img-list-flex">
                <img src="./img/guan.png" alt="">
                <p>关于我们</p>
            </div>

            <div class="img-list-flex">
                <img src="./img/guan.png" alt="">
                <p>关于我们</p>
            </div>

            <div class="img-list-flex">
                <img src="./img/guan.png" alt="">
                <p>关于我们</p>
            </div>

            <div class="img-list-flex">
                <img src="./img/guan.png" alt="">
                <p>关于我们</p>
            </div>
        </div>

        <div class="swipe">
            <van-swipe :autoplay="3000" indicator-color="transparent">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img :src="image"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="shequ">
            <div class="shequ-title">
                <span></span>
                <p>社区动态</p>
            </div>
            <div class="list-shequ">
                <div class="list-shequ-cont">
                    <div class="list-shequ-cont1">
                        <p>通知</p>
                        <p>7条</p>
                    </div>
                    <div class="list-shequ-cont2">
                        <p>紧急事项</p>
                    </div>
                </div>

                <div class="list-shequ-cont">
                    <div class="list-shequ-cont1">
                        <p>通知</p>
                        <p>7条</p>
                    </div>
                    <div class="list-shequ-cont2">
                        <p>紧急事项</p>
                    </div>
                </div>
            </div>

            <div class="list-shequ">
                <div class="list-shequ-cont">
                    <div class="list-shequ-cont1">
                        <p>通知</p>
                        <p>7条</p>
                    </div>
                    <div class="list-shequ-cont2">
                        <p>紧急事项</p>
                    </div>
                </div>

                <div class="list-shequ-cont">
                    <div class="list-shequ-cont1">
                        <p>通知</p>
                        <p>7条</p>
                    </div>
                    <div class="list-shequ-cont2">
                        <p>紧急事项</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="shequ">
            <div class="shequ-title shequ-title-c11">
                <div class="shequ-title-1">
                    <span></span>
                    <p>项目风采</p>
                </div>
                <p class="gengduo">更多...</p>
            </div>
            <div class="list-xiangmu">
                <div class="list-xiangmu-cont">
                    <div class="list-xiangmu-cont1">
                        <img src="https://img.yzcdn.cn/vant/apple-2.jpg" alt="">
                    </div>
                    <div class="list-xiangmu-cont2">
                        <p>
                            万达茂商业广场
                        </p>
                        <p>
                            建筑面积40万方，商业综合体，荣获南京市...
                        </p>
                    </div>
                </div>

                <div class="list-xiangmu-cont">
                    <div class="list-xiangmu-cont1">
                        <img src="https://img.yzcdn.cn/vant/apple-2.jpg" alt="">
                    </div>
                    <div class="list-xiangmu-cont2">
                        <p>
                            万达茂商业广场
                        </p>
                        <p>
                            建筑面积40万方，商业综合体，荣获南京市...建筑面积40万方建筑面积40万方建筑面积40万方
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Footer-box></Footer-box>
    </div>
</template>

<script>
    import Footer from '../../components/footer.vue'
    export default {
        name: "home",
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
        methods: {
            payFees() {
                this.$router.push('/payFees')
            }
        }
    }
</script>

<style scoped>
    .header {
        background: #05ba8b;
        width: 100%;
        height: 4.5rem;
        padding-top: 0.7rem;
        box-sizing: border-box;
        position: relative;
        z-index: 99;
    }

    .header-img {
        width: 100%;
        border-radius: 50%;
        text-align: center;
    }

    .header-img img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
    }

    .name {
        width: 100%;
        text-align: center;
        color: #fff;
        margin-top: 0.1rem;
    }

    .balance {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.1rem;
    }

    .balance span {
        color: #fff;
        font-size: 0.3rem;
        margin-left: 0.1rem;
        position: relative;
        top: 0.01rem;
    }

    .qr {
        text-align: center;
        width: 5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #05ba8b;
        margin: auto;
        padding-top: 0.3rem;
        box-sizing: border-box;
    }

    .qr p {
        font-size: 0.24rem;
        color: #fff;
    }

    .img-list {
        padding-top: 0.7rem;
        overflow-x: auto;
        padding-bottom: 0.4rem;
        position: relative;
        z-index: 9;
        background: #fff;
        box-sizing: border-box;
        display: flex;
        padding-left: 0.6rem;
    }

    .img-list-flex {
        width: 20%;
        text-align: center;
        padding-right: 0.6rem;
        display: inline-block;
    }

    .img-list-flex img {
        width: 0.8rem;
        height: 0.8rem;
    }

    .img-list-flex p {
        font-size: 0.24rem;
        color: #333;
        width: 1.2rem;
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

    .list-xiangmu-cont:last-child {
        border-bottom: 0;
    }

    .list-xiangmu-cont .list-xiangmu-cont1 img {
        width: 2rem;
        height: 1rem;
    }

    .list-xiangmu-cont .list-xiangmu-cont1 {
        margin-right: 0.2rem;
    }
    
    .gengduo {
        color: #999;
    }

    .list-xiangmu-cont2 p:first-child{
        color: #333;
        font-size: 0.3rem;
    }
    .list-xiangmu-cont2 p:last-child{
        color: #999;
        font-size: 0.24rem;
        width: 100%;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        word-wrap: break-word;
    }
    .home{
        padding-bottom: 1.5rem;
    }
</style>