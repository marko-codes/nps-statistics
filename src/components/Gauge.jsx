import GaugeChart from 'react-gauge-chart'
import { StarIcon } from '@heroicons/react/24/solid'

function Gauge({ quarterYear, quarterlyNps }) {

    return (
        <div className=' flex flex-col w-11/12 bg-white rounded-xl px-10 shadow-lg justify-evenly lg:flex-row xl:flex-row 2xl:flex-row md:flex-col sm:flex-col'>
            {
                quarterYear.map((quarter) => {
                    const filteredNps = quarterlyNps.filter(
                        (item) => item.quarterYear === quarter.quarterYear);



                    return (
                        filteredNps.map((nps) => {
                            const detractors = nps.detractors;
                            const passives = nps.passives;
                            const promoters = nps.promoters;
                            const npsResult = nps.score;
                            return (
                                <div key={nps.id} className='flex flex-col h-full py-5'>
                                    <h1 className=' text-2xl font-semibold text-center m-2'>{nps.quarterYear}</h1>
                                    <GaugeChart

                                        id="gauge-chart5"
                                        textColor='#464A4F'
                                        nrOfLevels={30}
                                        arcsLength={[detractors / 100, passives / 100, promoters / 100]}
                                        colors={['#EA4228', '#F5CD19', '#5BE12C',]}
                                        percent={(npsResult + 100) / 200}
                                        arcPadding={0.01}
                                        formatTextValue={value => npsResult}
                                    />
                                    <div className='flex flex-row justify-between items-center px-9'>
                                        <p>-100</p>
                                        <p>100</p>
                                    </div>
                                    <div className='flex flex-row justify-evenly items-center px-0'>
                                        <div className=' flex flex-row items-center justify-center'><StarIcon className=' text-red-500 w-4 h-4' /> <p>Ditractors</p></div>
                                        <div className=' flex flex-row items-center justify-center'><StarIcon className=' text-yellow-500 w-4 h-4' /> <p>Pasives</p></div>
                                        <div className=' flex flex-row items-center justify-center'><StarIcon className=' text-green-500 w-4 h-4' /> <p>Promoters</p></div>
                                    </div>
                                    <div className=' flex flex-col bg-gray-200 gap-2 p-2 mt-5 rounded-md w-full'>
                                        <div className='flex bg-white rounded-md items-center justify-center'>{Math.round(detractors)}% Detractors</div>
                                        <div className='flex bg-white rounded-md items-center justify-center'>{Math.round(passives)}% Pasives</div>
                                        <div className='flex bg-white rounded-md items-center justify-center'>{Math.round(promoters)}% Promoters</div>
                                        <div className='flex bg-white rounded-md items-center justify-center'>{npsResult} NPS</div>
                                    </div>
                                </div>
                            )
                        }))
                })
            }

        </div>
    )
}

export default Gauge