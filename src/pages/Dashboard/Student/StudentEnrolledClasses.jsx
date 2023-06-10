import React from 'react';
import useSelectedClasses from '../../../hooks/useSelectedClasses';

const StudentEnrolledClasses = () => {
    const [selectedClasses] = useSelectedClasses();
    console.log(selectedClasses)

    return (
        <div>
            s
        </div>
    );
};

export default StudentEnrolledClasses;