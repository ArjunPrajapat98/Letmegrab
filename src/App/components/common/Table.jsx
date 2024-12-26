import React, { useState } from "react";

const Table = (props) => {
    const { data, columns, isLoading } = props;

    return (
        <>
            <table className="table">
                <thead className="">
                    <tr>
                        {columns?.map((column, index) => (
                            <th key={index}>{column?.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ? data?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{row[column?.accessor]}</td>
                            ))}
                        </tr>
                    )) :
                        <tr>
                            <td><span className="_tblText">No data</span></td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    );
};

export default Table