import { Route, Routes } from 'react-router-dom';
import AddState from './Scens/State/AddState';
import StateHome from './Scens/State/StateHome';
import UpdateState from './Scens/State/UpdateState';
import WarHome from './Scens/War_History/WarHome';
import WarUpdate from './Scens/War_History/WarUpdate';
import WarAdd from './Scens/War_History/WarAdd';
import ShortHome from './Scens/Shorts_video/ShortHome';
import ShortAdd from './Scens/Shorts_video/ShortAdd';
import Homepageofadmin from './Scens/UI/Homepageofadmin';
import ShortUpdate from './Scens/Shorts_video/ShortUpdate';
import Maphome from "./Scens/Map/Maphome"
import Livestream from './Scens/Livestream/Livestream';
import Livestream2 from './Scens/Livestream/Livestream2';
import Livestream3 from './Scens/Livestream/Livestream3';
import MapExtract from './Scens/UI/MapExtract';
import OriginHome from './Scens/Origin_History/OriginHome';
import OriginAdd from './Scens/Origin_History/OriginAdd';
import OriginUpdate from './Scens/Origin_History/OriginUpdate';
import PlaceHome from './Scens/Famous_thing/Place/PlaceHome';
import PlaceAdd from './Scens/Famous_thing/Place/PlaceAdd';
import PlaceUpdate from './Scens/Famous_thing/Place/PlaceUpdate';
import FoodAdd from './Scens/Famous_thing/Food/FoodAdd';
import FoodHome from './Scens/Famous_thing/Food/FoodHome';
import FoodUpdate from './Scens/Famous_thing/Food/FoodUpdate';
import FestivalHome from './Scens/Famous_thing/Festival/FestivalHome';
import FestivalAdd from './Scens/Famous_thing/Festival/FestivalAdd';
import FestivalUpdate from './Scens/Famous_thing/Festival/FestivalUpdate';
import DanceHome from './Scens/Famous_thing/Dances/DanceHome';
import DanceAdd from './Scens/Famous_thing/Dances/DanceAdd';
import DanceUpdate from './Scens/Famous_thing/Dances/DanceUpdate';
import ProductHome from './Scens/Famous_thing/Product/ProductHome';
import ProductAdd from './Scens/Famous_thing/Product/ProductAdd';
import ProductUpdate from './Scens/Famous_thing/Product/ProductUpdate';
import Artist_verification from './Scens/User_Verification/Artist_verification_Home';
import Update_Artist from './Scens/User_Verification/Update_Artist';

const Approutes = () => {

    return (
        <>
            <Routes>
                {/* <Route  path='/' element={<StateHome /> } /> */}
                {/* <Route  path='/' element={<Homepageofadmin /> } /> */}
                {/* <Route path='/' element={<MapExtract />} /> */}
                <Route path='/' element={<StateHome />} />

                <Route path='/Artist_verification' element={<Artist_verification />} />
                <Route path='/update_artist/:userId' element={<Update_Artist />} />

                {/* -------------------------- State ------------------------- */}
                <Route path='/state_home' element={<StateHome />} />
                <Route path='/Add_State' element={<AddState />} />
                <Route path='/Update_State/:id' element={<UpdateState />} />

                {/* -------------------------- History ------------------------- */}

                <Route path='/War_home' element={<WarHome />} />
                <Route path='/Add_War' element={<WarAdd />} />
                <Route path='/Update_War/:historyId' element={<WarUpdate />} />

                <Route path='/origin_home' element={<OriginHome />} />
                <Route path='/Add_origin' element={<OriginAdd />} />
                <Route path='/Update_origin/:originhistoryId' element={<OriginUpdate />} />

                {/* -------------------------- Video ------------------------- */}

                <Route path='/Short_home' element={<ShortHome />} />
                <Route path='/Add_short' element={<ShortAdd />} />
                <Route path='/Update_short/:videoId' element={<ShortUpdate />} />

                {/* -------------------------- Famous things ------------------------- */}

                <Route path='/Place_home' element={<PlaceHome />} />
                <Route path='/Add_Place' element={<PlaceAdd />} />
                <Route path='/Update_place/:HeritageId' element={<PlaceUpdate />} />

                <Route path='/food_home' element={<FoodHome />} />
                <Route path='/Add_Food' element={<FoodAdd />} />
                <Route path='/Update_Food/:foodId' element={<FoodUpdate />} />

                <Route path='/festival_home' element={<FestivalHome />} />
                <Route path='/Add_festival' element={<FestivalAdd />} />
                <Route path='/Update_festival/:FestivalId' element={<FestivalUpdate />} />

                <Route path='/dance_home' element={<DanceHome />} />
                <Route path='/Add_dance' element={<DanceAdd />} />
                <Route path='/Update_dance/:DanceId' element={<DanceUpdate />} />

                <Route path='/product_home' element={<ProductHome />} />
                <Route path='/Add_product' element={<ProductAdd />} />
                <Route path='/Update_product/:productId=]=' element={<ProductUpdate />} />

                {/* -------------------------- Map ------------------------- */}

                <Route path='/maphome' element={<Maphome />} />
                <Route  path='/Livestream' element={<Livestream3 /> } />
            </Routes>
        </>
    )

}

export default Approutes;