import React, { useEffect, useState } from 'react'

function Questions({ quarterYear, questions, improvements }) {


    const [combined, setCombined] = useState([]);

    useEffect(() => {

        const combined = quarterYear.map((quart) => {
            const matchingQuestions = improvements.filter((improve) =>
                questions.some((quest) =>

                    quest.question === improve.question && improve.quarterYear === quart.quarterYear

                )
            );
            return {
                quarterKey: quart.quarterYear,
                questions: matchingQuestions
            };

        });

        setCombined(combined);

    }, [quarterYear, questions, improvements])


    return (
        <>
            <div className=' flex flex-col w-11/12 bg-white rounded-xl px-10 shadow-lg justify-evenly lg:flex-row xl:flex-row 2xl:flex-row md:flex-col sm:flex-col'>
                <table className='flex flex-col items-center justify-center h-full w-full py-5'>
                    <thead className='flex w-full'>
                        <tr className=' flex flex-row bg-blue-700 text-white gap-2 p-2 rounded-t-md w-full items-center justify-evenly'>
                            <th className='flex bg-blue-700 font-bold rounded-md items-center justify-center w-4/12'>How can we improve?</th>
                            {combined.map(data => (
                                <th key={data.quarterKey} className='flex bg-blue-700 font-bold rounded-md items-center justify-center w-2/12'>{data.quarterKey}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='flex flex-col items-center justify-evenly h-full w-full p-1 m-0 rounded-b-md bg-gray-200'>
                        {questions.map(question => (
                            <tr key={question.id} className=' flex flex-row bg-gray-200 text-black gap-2 p-2 w-full items-center justify-evenly' >
                                <td className='flex bg-white rounded-md items-center justify-center w-4/12' >{question.question}</td>
                                {combined.map(data => {
                                    const matchingImprovement = data.questions.find(improvement =>
                                        improvement.question === question.question
                                    );

                                    return (
                                        <td key={data.quarterKey} className='flex bg-white rounded-md items-center justify-center w-2/12'>
                                            {matchingImprovement ? matchingImprovement.percentage + ' %' : '0 %'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Questions