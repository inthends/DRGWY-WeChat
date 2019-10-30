import Home from './pages/Home/Home';
import User from './pages/user/user';
import Login from './pages/login/login';
import Pay from './pages/Home/pay/pay';
import PayDetail from './pages/Home/pay/pay-detail/pay-detail';
import Auth from './pages/auth/auth';
import Binding from './pages/binding/binding';
import House from './pages/binding/house/house';
import Personnel from './pages/binding/personnel/personnel';
import Repairs from './pages/Home/repairs/repairs';
import Steward from './pages/Home/steward/steward';
import Stall from './pages/Home/stall/stall';
import About from './pages/Home/about/about';
import About2 from './pages/Home/about2/about2';
import Work from './pages/user/work/work';
import WorkDetail from './pages/user/work/work-detail/work-detail';
import UserDetail from './pages/user/user-detail/user-detail';
import GetNewsPageList from './pages/Home/GetNewsPageList/getNewsPageList';
import newDetail from './pages/Home/GetNewsPageList/newDetail/newDetil';
import newDetail2 from './pages/Home/newDetail2/newDetil2';

const Routers = [
    {path: '/auth', title: '登录', component: Auth},
    {path: '/home', title: '物业', component: Home},
    {path: '/user', title: '我的', component: User},
    {path: '/login', title: '登录', component: Login},
    {path: '/pay', title: '查询缴费', component: Pay},
    {path: '/payDetail', title: '查询缴费', component: PayDetail},
    {path: '/binding', title: '绑定客户', component: Binding},
    {path: '/house', title: '默认房产', component: House},
    {path: '/personnel', title: '绑定客户', component: Personnel},
    {path: '/repairs', title: '报事报修', component: Repairs},
    {path: '/steward', title: '在线管家', component: Steward},
    {path: '/stall', title: '车位续租', component: Stall},
    {path: '/about', title: '关于我们', component: About},
    {path: '/about2', title: '项目风采', component: About2},
    {path: '/work', title: '工单', component: Work},
    {path: '/workDetail', title: '工单', component: WorkDetail},
    {path: '/userDetail', title: '我的设置', component: UserDetail},
    {path: '/getNewsPageList', title: '社区通知', component: GetNewsPageList},
    {path: '/newDetail', title: '通知详情', component: newDetail},
    {path: '/newDetail2', title: '项目详情', component: newDetail2},
    {title: '404', auth: false},
];
export default Routers;

