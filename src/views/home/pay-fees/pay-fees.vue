<template>
    <div>
        <div>
            <van-field
                    readonly
                    clickable
                    :value="value"
                    placeholder="请选择"
                    right-icon="arrow-down"
                    @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @cancel="showPicker = false"
                        @confirm="onChange"
                />
            </van-popup>
        </div>
        <div class="cont-list">
            <div class="cont-list-cont">
                <div class="cont-list-cont-felx">
                    <p>2019年08月</p>
                    <p><span style="color: #333;">合计：</span>5000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>物业费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>车位服务费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>2019-07-30 08:30 送达</p>
                    <p>立即缴费</p>
                </div>
            </div>

            <div class="cont-list-cont">
                <div class="cont-list-cont-felx">
                    <p>2019年08月</p>
                    <p><span style="color: #333;">合计：</span>5000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>物业费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>车位服务费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>2019-07-30 08:30 送达</p>
                    <p>立即缴费</p>
                </div>
            </div>

            <div class="cont-list-cont">
                <div class="cont-list-cont-felx">
                    <p>2019年08月</p>
                    <p><span style="color: #333;">合计：</span>5000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>物业费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>车位服务费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>2019-07-30 08:30 送达</p>
                    <p>立即缴费</p>
                </div>
            </div>

            <div class="cont-list-cont">
                <div class="cont-list-cont-felx">
                    <p>2019年08月</p>
                    <p><span style="color: #333;">合计：</span>5000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>物业费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>车位服务费</p>
                    <p>3000.00</p>
                </div>
                <div class="cont-list-cont-felx">
                    <p>2019-07-30 08:30 送达</p>
                    <p>立即缴费</p>
                </div>
            </div>
        </div>

        <div class="btn">
            <button>全部交清</button>
        </div>
    </div>
</template>

<script>
    const citys = {
        '浙江': {'浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州']}
    };
    export default {
        name: "pay-fees",
        data() {
            return {
                columns: [
                    {
                        values: Object.keys(citys),
                        className: 'column1'
                    },
                    {
                        values: Object.keys(citys['浙江']),
                        className: 'column2',
                        defaultIndex: 0
                    },
                    {
                        values: citys['浙江']['浙江'],
                        className: 'column3',
                        defaultIndex: 1
                    }
                ],
                value: '',
                showPicker: false,
            };
        },
        methods: {
            // onChange(picker, values) {
            //     console.log(picker)
            //     console.log(values)
            // }
        }
    }
</script>

<style scoped>
    .cont-list {
        margin-bottom: 0.2rem;
    }

    .cont-list-cont {
        width: 90%;
        margin: auto;
        margin-bottom: 0.2rem;
        box-sizing: border-box;
        padding: 0.4rem;
        background: #fff;
        margin-top: 0.2rem;
        border-radius: 0.1rem;
    }

    .cont-list-cont-felx {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.2rem;
    }

    .cont-list-cont-felx:last-child {
        margin-bottom: 0;
    }

    .cont-list-cont-felx p:first-child {
        color: #333;
        font-size: 0.26rem;
    }

    .cont-list-cont-felx p:last-child{
        color: #e4393c;
        font-size: 0.26rem;
    }

    .cont-list-cont-felx:last-child p:last-child{
        background: #1989fa;
        color: #fff;
        padding:0.05rem 0.2rem;
        border-radius: 0.1rem;
    }

    .btn {
        margin-top: 0.8rem;
        text-align: center;
    }

    .btn button{
        width: 80%;
        text-align: center;
        background: #1989fa;
        border: none;
        color: #fff;
        padding: 0.15rem 0;
        border-radius: 0.1rem;
    }
</style>