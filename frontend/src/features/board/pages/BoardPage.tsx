import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "api/projects/fetchProject";
import Loading from "shared/components/Loading";
import GenericBoard from "../GenericBoard";

export const BoardPage = () => {
    const title: string = "Board";
    // const [isLoading, setIsLoading] = useState(true);
    // const [project, setProject] = useState<IProject | undefined>(undefined);

    const query = useQuery(['project', 'p001'], ( { queryKey }) => fetchProject(queryKey[1]));

    // useEffect(() => {
    //     setIsLoading(true);
    //     projectApi.findOne("")
    //         .then(project => setProject(project))
    //         .finally(() => setIsLoading(false));
    // }, []);

    return (
        <section className="page">
            <header style={{display: 'none'}}>
                <h2>{title}</h2>
            </header>
            <Loading
                isLoading={query.isLoading}
                element={!!query.data &&  <GenericBoard title='Board' project={query.data} />}
                fallback={<div>Not found!</div>}
            />
        </section>
        
    )
}
