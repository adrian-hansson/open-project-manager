import { StoryMapGroupModel, StoryMapModel } from 'core/models/StoryMap';
import { IProject } from 'core/types/IProject';
import { Filter } from 'features/board-new/components/Filter';
import { useState } from 'react';
import './StoryMap.scss';
import { StoryMapItem } from './StoryMapItem';

export interface IStoryMapProps {
    project: IProject;
}

export interface IStoryMapGroupProps {
    groups: StoryMapGroupModel[];
    parentOffsetX: number;
    parentOffsetY: number;
}

export function StoryMapGroupCollection(props: IStoryMapGroupProps) {
    return <>{props.groups.map((group, index) => {
        let offsetX: number = props.parentOffsetX;
        let offsetY: number = props.parentOffsetY;

        let widthOfPreviousGroups: number = 0;

        if (index > 0 ) {
            widthOfPreviousGroups = props.groups
                .slice(0, index)
                .map(previousGroup => previousGroup.width)
                .reduce((prev, current) => prev + current);

            offsetX = offsetX + widthOfPreviousGroups;
        }
    
        let colStart: number = offsetX + 1;
        const colEnd: number = colStart + group.width;
    
        // Handle vertical stacking for bottom-level issues
        // if (group.isInVerticalStack) {
        //     colStart = props.parentOffsetX;
        //     offsetY = offsetY + index;
        // }

        const rowStart: number = offsetY + 1;
        const rowEnd: number = offsetY + 1;

        console.log({
            level: group.issue.type.level,
            parentOffsetX: props.parentOffsetX,
            parentOffsetY: props.parentOffsetY,
            widthOfPreviousGroups: widthOfPreviousGroups,
            width: group.width,
            offsetX: offsetX,
            offsetY: offsetY,
            colStart: colStart,
            colend: colEnd,
            rowStart: rowStart,
            rowEnd: rowEnd
        });

        return <>
            <StoryMapItem
                issue={{
                    ...group.issue,
                    title: group.width.toString()
                    // title: `
                    //     colStart: ${colStart},
                    //     colEnd: ${colEnd},
                    //     rowStart: ${rowStart},
                    //     rowEnd: ${rowEnd}
                    // `
                }}
                gridColumnStart={colStart}
                gridColumnEnd={colEnd}
                gridRowStart={rowStart}
                gridRowEnd={rowEnd}
            />
            <StoryMapGroupCollection
                groups={group.children}
                parentOffsetX={offsetX}
                parentOffsetY={offsetY + 1} />
        </>;
    })}</>;
}

export function StoryMap(props: IStoryMapProps) {
    const [filteredProject, setFilteredProject] = useState<IProject>(props.project);
    const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);

    const storyMap: StoryMapModel = new StoryMapModel(filteredProject);

    return (
        <div className="storymap">
            <header>
                <form className='filter'>
                    <Filter
                        project={props.project}
                        setFilteredProject={setFilteredProject}
                        setIsFilterLoading={setIsFilterLoading}
                    />

                    {isFilterLoading && <div>Loading...</div>}
                </form>
            </header>
            <div
                className="storymap-grid"
                style={{
                    display: 'grid',
                    gap: '0.25rem'
                }}
            >
                <StoryMapGroupCollection
                    groups={storyMap.groups}
                    parentOffsetX={0}
                    parentOffsetY={0} />
            </div>
        </div>
    );
}
