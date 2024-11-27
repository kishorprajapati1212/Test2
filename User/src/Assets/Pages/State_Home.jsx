import State_Card from "../Component/State_Main_Component/State_Card";
import State_Information from "../Component/State_Main_Component/State_Information";
import State_Slide from "../Component/State_Main_Component/State_Slider";

const State_Home = () => {
    return (
        <>
            <State_Slide />
            <State_Information />
            <State_Card />
        </>
    )
}

export default State_Home;