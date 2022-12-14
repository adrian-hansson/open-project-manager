import { BoardPage } from "features/board-new/pages/BoardPage";
import { RoadmapPage } from "features/roadmap/pages/RoadmapPage";
import { StoryMapPage } from "features/storymap/pages/StoryMapPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutFooter from "./layout-footer/LayoutFooter";
import LayoutHeader from "./layout-header/LayoutHeader";
import LayoutNav from "./layout-nav/LayoutNav";
import "./Layout.scss";

function Layout() {

    return (
        <div className="app">
            <BrowserRouter>
                <LayoutHeader />
                <LayoutNav />
                {/* <LayoutBreadcrumbs /> */}
                <main>
                    <Routes>
                        <Route path="/" element={ <div>Home</div> } />
                        <Route path="board" element={ <BoardPage /> } />
                        <Route path="roadmap" element={ <RoadmapPage /> } />
                        <Route path="storymap" element={ <StoryMapPage /> } />
                        <Route path="issues" element={ <div>issues</div> } />
                        <Route path="project/:id" element={ <div>project</div>} />
                    </Routes>
                </main>
                <LayoutFooter />
            </BrowserRouter>
        </div>
    )
}

export default Layout;
