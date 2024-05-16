import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const ListCard = ({ data, addData, deleteData }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const rowsPerPage = 5; // Set rows per page

    function formatRupiah(number) {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return formatter.format(number);
    }

    const types = [
        {
            value: 1,
            text: "Pemasukan",
        },
        {
            value: 2,
            text: "Pengeluaran",
        },
    ];


    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);
    const [type, setType] = useState(1);


    // Error
    const [error, setError] = useState(false);


    const cleaningData = () => {
        setTitle("");
        setValue(0);
        setType(1);
    };


    const submitForm = (e) => {
        setError(false);
        e.preventDefault();


        if (title !== "") {
            const inputValue = {
                title: title,
                value: value,
                type: type,
            };


            addData(inputValue);
            cleaningData();
            setShowModal(false);
        } else {
            setError(true);
        }
    };

    const columns = [
        {
            name: 'No',
            selector: (row, index) => currentPage * rowsPerPage + index + 1,
            width: '50px',
        },
        {
            name: 'Judul',
            selector: row => row.title,
            wrap: true,
        },
        {
            name: 'Jumlah',
            selector: row => formatRupiah(row.value),
            wrap: true,
        },
        {
            name: 'Jenis',
            selector: row => row.type === 1 ? 'Pemasukan' : 'Pengeluaran',
            sortable: true,
            sortFunction: (a, b) => a.type - b.type,
            cell: row => (
                row.type === 1
                    ? <div className="badge bg-primary-subtle text-black">Pemasukan</div>
                    : <div className="badge bg-danger-subtle text-black">Pengeluaran</div>
            ),
            wrap: true,
            defaultSortAsc: true,
        },
        {
            name: 'Aksi',
            cell: row => (
                <button
                    onClick={() => deleteData(row.code)}
                    className='mb-0 btn btn-danger'>
                    <i className="bx bxs-trash"></i>
                </button>
            ),
        },
    ];

    const toggleModal = (e) => {
        e.stopPropagation(); // Menghentikan penyebaran event klik
        setShowModal(!showModal);
        if (!showModal) {
            cleaningData(); // Membersihkan data setiap kali modal ditampilkan
        }
    };
    

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 '>
                    <div className='card mb-3'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <h5>Data</h5>
                                <button className='btn btn-sm btn-primary' onClick={(e) => toggleModal(e)}>Tambah</button>
                            </div>
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                                paginationPerPage={rowsPerPage}
                                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                defaultSortFieldId={4}
                                onChangePage={page => setCurrentPage(page - 1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header justify-content-between">
                                <h5 className="modal-title">Tambah Data</h5>
                                <button type="button" className="btn" aria-label="Close" onClick={(e) => toggleModal(e)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitForm}>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputTitle'
                                            className='form-label'>
                                            Judul
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${error ? "is-invalid" : ""
                                                }`}
                                            placeholder="Masukkan Judul"
                                            id='inputTitle'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        {title === "" ? (
                                            <div className='invalid-feedback'>
                                                Wajib Diisi
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputType'
                                            className='form-label'>
                                            Tipe
                                        </label>
                                        <select
                                            className='form-select'
                                            aria-label='inputType'
                                            value={type}
                                            onChange={(e) =>
                                                setType(Number(e.target.value))
                                            }>
                                            {types.map((item, index) => (
                                                <option key={index} value={item.value}>
                                                    {item.text}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='inputNominal'
                                            className='form-label'>
                                            Nominal
                                        </label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            id='inputNominal'
                                            value={value}
                                            onChange={(e) =>
                                                setValue(Number(e.target.value))
                                            }
                                        />
                                    </div>

                                    <button className='btn btn-primary' type='submit'>
                                        Simpan Transaksi
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ListCard;
