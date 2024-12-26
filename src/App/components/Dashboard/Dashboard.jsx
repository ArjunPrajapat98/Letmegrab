import React, { useEffect, useState } from 'react'
import Table from '../common/Table'
import { createProduct, deleteData, deleteProduct, editProduct, getCategoiesListData, getProductListData } from '../../_services'
import { utils } from '../../helper/utils'
import { Link } from 'react-router-dom'
import Dropdown from '../common/Dropdown'
import InputModal from '../common/InputModal'
import { InputField } from '../common/InputField'
import { toast } from 'react-toastify'
import CommonButton from '../common/CommonButton'
import TextArea from '../common/Textarea'
import { errorSchema } from '../../helper'

const Dashboard = () => {

    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState({
        search: '',
        categories: '',
    })

    const [formValue, setFormValue] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
    })
    const [formError, setFormError] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isView, setIsView] = useState(false);

    const getDataProductList = async () => {
        setLoading(true);
        try {
            const res = await getProductListData(filters?.categories);
            if (res?.length > 0) {
                setProductList(res);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error(`Server Side Error`);
        }
    }

    const getCategoies = async () => {
        try {
            const res = await getCategoiesListData();
            if (res?.length > 0) {
                setCategoryList(res);
            }
        } catch (error) {
            toast.error(`Server Side Error`);
        }
    }

    useEffect(() => {
        getDataProductList();
    }, [filters])

    useEffect(() => {
        getCategoies();
    }, [])

    const deleteHandler = async (value) => {
        try {
            const res = await deleteProduct(value?.id);
            // if (res) {
            const listArray = [...productList];
            const ind = listArray.findIndex((item) => item?.id === value?.id);
            listArray.splice(ind, 1)
            setProductList(listArray);
            toast.success(`Product deleted succesfully`);
            // }
        } catch (error) {
            toast.error(`Server Side Error`);
        }
    }

    const columns = [
        { header: "Product Title", accessor: "title" },
        { header: "Product Price", accessor: "price" },
        { header: "Product Description", accessor: "description" },
        { header: "Product Category", accessor: "category" },
        { header: "Action", accessor: "action" },
    ];

    const handleEditAction = (item) => {
        setFormValue(item);
        setIsEdit(item);
        setIsOpen("edit");
        setFormError("");
    };

    const RowListData = (data) => {
        return data?.map((item, i) => ({
            ...item,
            title: <>{item?.title ? utils.spliceString(item?.title, 0, 20) : '-'} </>,
            price: <>{item?.price ? item?.price : '-'} </>,
            description: <>{item?.description ? utils.spliceString(item?.description, 0, 20) : '-'} </>,
            category: <>{item?.category ? utils.spliceString(item?.category, 0, 20) : '-'} </>,
            action: <div className='tabl_cls'>
                <div className='_avPointer' onClick={(e) => setIsView(item)}>
                    <span className='_samAnchor'>
                        View
                    </span>
                </div>
                <div className='_avPointer' onClick={(e) => handleEditAction(item)}>
                    <span className='_samAnchor'>
                        Update
                    </span>
                </div>
                <div className='_avPointer' onClick={() => deleteHandler(item)}>
                    <span className='_samAnchor'>
                        Delete
                    </span>
                </div>
            </div>,
        }));
    };

    const filterOnChange = async (name, value) => {
        const stateObj = { ...filters, [name]: value };
        setFilters(stateObj);
    };

    const handleOnChange = async (name, value) => {
        const stateObj = { ...formValue, [name]: value };
        setFormValue(stateObj);
        if (!!formError) {
            const error = await utils.checkFormError(stateObj, errorSchema.productSchema);
            setFormError(error);
        }
    };

    // useEffect(() => {
    //     const debounceTimer = setTimeout(() => {
    //         if (search.trim() !== "") {
    //             setFilters((s) => ({ ...s, search: search }))
    //         }
    //     }, 1000);

    //     return () => clearTimeout(debounceTimer);
    // }, [search]);

    const onSubmit = async () => {
        const validationResult = await utils.checkFormError(formValue, errorSchema.productSchema);
        if (validationResult === true) {
            setLoading(true);
            if (isOpen === "edit" || formValue?.id) {
                const data = { ...formValue };
                try {
                    const res = await editProduct(data);
                    if (res) {
                        const listArray = [...productList];
                        const ind = listArray.findIndex((item) => item?.id === formValue?.id);
                        if (ind > -1) {
                            listArray[ind] = res;
                            setProductList(listArray);
                            toast.success(`Product Edited successfully`);
                        }
                    }
                } catch (error) {
                    toast.error(`Error editing product`);
                }
                setLoading(false);
                setIsOpen(false);
                setIsEdit(false);
            } else {
                try {
                    const data = { ...formValue };
                    const res = await createProduct(data);
                    if (res) {
                        setProductList([...productList, res]);
                        toast.success(`Product Created successfully`);
                    }
                } catch (error) {
                    toast.error(`Error creating product`);
                }
                setLoading(false);
                setIsOpen(false);
            }
        } else {
            setFormError(validationResult);
            setLoading(false);
        }
    };

    const handleToggle = () => {
        setIsOpen(false)
        setFormError("");
        setLoading(false);
        setFormValue({});
        setIsEdit(false);
        setIsOpen(false);
    }

    const filteredProductList = productList.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div>
                <div className='container'>
                    <div className='flexBet_cls mb-2'>
                        <p className='flt_fonts'> Filters </p>
                        <div className='tabl_cls'>
                            <input
                                placeholder="Search"
                                label="Search"
                                name='search'
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <Dropdown
                                placeholder="Select Categories"
                                className="anvSel_drop"
                                name="categories"
                                isClearable={true}
                                isSearchable={true}
                                options={
                                    categoryList.length > 0
                                        ? categoryList?.map((e) => {
                                            return { value: e, label: e };
                                        })
                                        : []
                                }
                                selectedOption={filters?.categories}
                                setSelectedOption={(data) => {
                                    filterOnChange("categories", data?.value);
                                }}
                                valueText="value"
                                labelText="label"
                            />
                            <CommonButton onClick={(e) => { setIsOpen(true); setFormValue({}) }} name='Create Product'></CommonButton>
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        data={RowListData(filteredProductList)}
                        isLoading={loading}
                    />
                </div>
            </div>

            <InputModal
                isOpen={isOpen}
                headerName={isEdit ? "Edit Product" : "Add Product"}
                toggle={(e) => handleToggle(e)}
                submitLabel={isEdit ? "Update Product" : "Add Product"}
                onSubmit={(e) => onSubmit(e)}
                // disabled={isEdit ? JSON.stringify(formValue) === JSON.stringify(disableInp) : ""}
                inputProps={
                    <>
                        <div className='mb-2'>
                            <InputField
                                placeholder="Product Name"
                                name="title"
                                label='Product Name'
                                focus={!!formError.title}
                                error={formError.title}
                                value={formValue.title}
                                onChange={({ target: { name, value } }) =>
                                    handleOnChange(name, value)
                                }
                            />
                        </div>
                        <div className='mb-2'>
                            <InputField
                                placeholder="Price"
                                name="price"
                                label='Price'
                                type="number"
                                focus={!!formError.price}
                                error={formError.price}
                                value={formValue.price}
                                onChange={({ target: { name, value } }) =>
                                    handleOnChange(name, value)
                                }
                            />
                        </div>
                        <div className='mb-2'>
                            <InputField
                                placeholder="Category"
                                name="category"
                                label='Category'
                                focus={!!formError.category}
                                error={formError.category}
                                value={formValue.category}
                                onChange={({ target: { name, value } }) =>
                                    handleOnChange(name, value)
                                }
                            />
                        </div>
                        <div className='mb-2'>
                            <TextArea
                                placeholder="Description"
                                name="description"
                                type="textarea"
                                label='Description'
                                focus={!!formError.description}
                                error={formError.description}
                                value={formValue.description}
                                onChange={({ target: { name, value } }) =>
                                    handleOnChange(name, value)
                                }
                            />
                        </div>
                    </>
                }
            />

            {isView?.id &&
                <InputModal
                    isOpen={isView}
                    headerName="View Product"
                    toggle={(e) => setIsView(false)}
                    isHideSubmitButton={false}
                    inputProps={
                        <>
                            <div className='mb-2'>
                                <InputField
                                    placeholder="Product Name"
                                    name="title"
                                    disabled
                                    label='Product Name'
                                    value={isView.title}
                                />
                            </div>
                            <div className='mb-2'>
                                <InputField
                                    placeholder="Price"
                                    name="price"
                                    disabled
                                    label='Price'
                                    type="number"
                                    value={isView.price}
                                />
                            </div>
                            <div className='mb-2'>
                                <InputField
                                    placeholder="Category"
                                    disabled
                                    name="category"
                                    label='Category'
                                    value={isView.category}
                                />
                            </div>
                            <div className='mb-2'>
                                <TextArea
                                    placeholder="Description"
                                    disabled
                                    name="description"
                                    type="textarea"
                                    label='Description'
                                    value={isView.description}
                                />
                            </div>
                        </>
                    }
                />}
        </>
    )
}

export default Dashboard