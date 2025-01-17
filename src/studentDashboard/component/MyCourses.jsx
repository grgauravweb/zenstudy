import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PaginationNew from '../../components/pagination/PaginationNew';
import { FaSearch } from 'react-icons/fa';
import Cookies from 'js-cookie';

const CourseCard = ({ course }) => {
    const navigate = useNavigate()
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="relative">
                <img className="w-full rounded-2xl h-52 " src={course.course_id.thumbnail} alt="Course" />
                <div className=' relative rounded-full h-16 w-16 top-[-35px] right-[-13.5rem] mb-[-40px] bg-white '>
                    <button className="absolute top-[4px] left-[4px]  bg-blue-600 rounded-full p-4 ">
                        <svg className="w-6 h-6 text-white hover:animate-spin" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="px-4 py-2">
                <div className="font-bold text-lg mb-1 h-24">{course.course_id.title}</div>
                
                {
                    // <p className="text-gray-700 text-sm">{course.course_id.tutor}</p>
                }

                <p className="text-gray-600 text-xs">Created at - {formatDate(course.course_id.createdAt)}</p>
                <p className="text-gray-600 text-xs">{course.course_id.day}</p>
            </div>
            <div className="px-4 pt-2 pb-2">
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div className="text-xs text-gray-500">progress % Completed</div>
                    </div>
                    <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `progress %` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                    </div>
                </div>
                <button className="bg-blue-500 mt-2 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("/watch-course", { state: { id: course._id } })}>Continue Learning</button>
            </div>
        </div>
    );
};


const MyCourses = () => {
    const [courses, setCourse] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const itemperpage = 6
    const [searchText, setSearchText] = useState('');
    const token = Cookies.get("access_tokennew");
    let userId = null;

    if (token) {
        try {
            userId = token;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    useEffect(() => {
        const getcourse = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}zenstudy/api/payment/purchaseCourse`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_id: userId })
                });
                if (response.status === 204) {
                    setCourse([]);
                    setLoading(false);
                    return;
                }


                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                //console.log("Purchase_course", data)
                const filteredCourses = data.purchaseCourses.filter(purchase => purchase.course_id !== null);

                if (filteredCourses.length === 0) {
                    setCourse([]);
                } else {
                    setCourse(filteredCourses);
                }
        
                setLoading(false);
            } catch (error) {
                //console.log("Error:", error);
                setLoading(false);
            }
        }


        getcourse()
    }, [userId])


    const filteredData = courses.filter((course) => {
        const titleMatch = course.course_id?.title.toLowerCase().includes(searchText.toLowerCase());
        return titleMatch;
    });


    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="text-4xl font-bold animate-pulse">ZenStudy.</div>
        </div>
    }


    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemperpage,
        currentPage * itemperpage
    )
    return (
        <div className='container mx-auto p-4 flex flex-col items-center gap-4'>
            {courses.length === 0 ? (
                <div className="flex text-center justify-center items-center text-2xl md:text-3xl lg:text-4xl  text-gray-500">No courses found...</div>
            ) : (
                <Fragment>
                    <div className="flex items-center  justify-center bg-blue-100 rounded-full px-4 py-2 mb-4 w-full md:w-1/2 lg:w-1/2 ">
                        <input
                            type="text"
                            placeholder="Search Our course by title"
                            onChange={(e) => setSearchText(e.target.value)}
                            className="bg-blue-100 rounded-l-full focus:outline-none  py-2 w-full text-gray-700"
                        />
                        <button className="text-blue-500">
                            <FaSearch />
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-10">
                        {paginatedData.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                    <PaginationNew
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        data={filteredData}
                        itemsPerPage={itemperpage}
                    />
                </Fragment>
            )}
        </div>
    )
}
export default MyCourses