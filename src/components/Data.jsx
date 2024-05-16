import ListCard from "./data/ListCard";


const Data = ({ data, addData, deleteData }) => {
    return (
        <>
            <div className='mt-3'>
                <div className='row'>
                    <ListCard addData={addData} data={data} deleteData={deleteData} />
                </div>
            </div>
        </>
    );
};


export default Data;
