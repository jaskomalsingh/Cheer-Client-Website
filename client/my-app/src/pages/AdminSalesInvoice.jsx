import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import ChatButton from './ChatButton';
import "../styles/AdminSalesInvoice.css";
import SpeechButton from "./TextToSpeech";
import Cookies from 'js-cookie';

export const AdminSalesInvoice = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
    const [detailedInvoice, setDetailedInvoice] = useState(null);
    const [invoiceType, setInvoiceType] = useState('sales'); // 'sales' or 'purchase'
    const [selectedInvoiceType, setSelectedInvoiceType] = useState('sales');
    const [sageConnected, setSageConnected] = useState(false);

    useEffect(() => {
        //authenticateSage();
        if (Cookies.get('access_expires_in')) {
            setSageConnected(true)
        }
    }, []);

    const authenticateSage = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/sage/initialize', {
                method: 'GET',
                credentials: 'include', // Needed to include the HTTP-only cookie sent from the backend
            });
            if (response.ok) {
                // If you're redirected to an authentication page, you won't handle it here.
                // The user will be redirected back to your app after authentication is done.
                // After redirecting back, you would call getAllSalesInvoices.
            } else {
                throw new Error('Failed to authenticate with Sage');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/sage/initialize', {
                method: 'GET',
                credentials: 'include', 
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
            });
            if (response.ok) {
                console.log(response)
                // If you're redirected to an authentication page, you won't handle it here.
                // The user will be redirected back to your app after authentication is done.
                // After redirecting back, you would call getAllSalesInvoices.
            } else {
                throw new Error('Failed to authenticate with Sage');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const connectToSage = async () => {
        window.location.href = 'http://localhost:3001/api/auth/sage/initialize';
        /*if (sageConnected) {
            refreshAccessToken()
        } else {
            window.location.href = 'http://localhost:3001/api/auth/sage/initialize';
            setSageConnected(true)
        }*/
    };

    const getInvoices = async (type) => {
        setLoading(true);
        try {
            const endpoint = type === 'sales' ? 'get-all-sales-invoices' : 'get-all-purchase-invoices';
            const response = await fetch(`http://localhost:3001/api/auth/sage/${endpoint}`, {
                method: 'GET',
                credentials: 'include', // To send the cookie
            });
            if (response.ok) {
                const data = await response.json();
                setInvoices(data.$items);
                setInvoiceType(type); // Set the invoice type state
            } else {
                throw new Error(`Failed to fetch ${type} invoices`);
            }
        } catch (error) {
            console.error(`Error fetching ${type} invoices:`, error);
        }
        setLoading(false);
    };

    const getInvoiceDetails = async (id, type) => {
        setLoading(true);
        try {
            const endpoint = type === 'sales' ? 'get-sales-invoice' : 'get-purchase-invoice';
            const response = await fetch(`http://localhost:3001/api/auth/sage/${endpoint}/${id}`, {
                method: 'GET',
                credentials: 'include', // To send the cookie
            });
            if (response.ok) {
                const data = await response.json();
                setDetailedInvoice(data);
                setShowInvoiceDetails(true);
                setInvoiceType(type);
            } else {
                throw new Error(`Failed to fetch ${type} invoice details`);
            }
        } catch (error) {
            console.error(`Error fetching ${type} invoice details:`, error);
        }
        setLoading(false);
    };
    const renderInvoiceDetails = () => {
        if (!detailedInvoice) return <p>Loading invoice details...</p>;

        const invoiceLines = detailedInvoice.invoice_lines || [];
        const isSalesInvoice = detailedInvoice.hasOwnProperty('invoice_number');
        const sageLink = detailedInvoice.links?.find(link => link.rel === 'alternate')?.href;
        const webviewLink = detailedInvoice.links?.find(link => link.rel === 'bookmark')?.href; // Assuming 'bookmark' rel is for the webview

        return (
            <div>
                <h2>{isSalesInvoice ? 'Sales' : 'Purchase'} Invoice Details: {detailedInvoice.displayed_as}</h2>
                <div className="invoice-details-container">
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty/Hrs</th>
                                <th>Price/Rate</th>
                                <th>Sales Tax</th>
                                <th>Net</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceLines.map((line, index) => (
                                <tr key={index}>
                                    <td>{line.description}</td>
                                    <td>{line.quantity}</td>
                                    <td>${line.unit_price}</td>
                                    <td>{line.tax_rate?.displayed_as || 'N/A'}</td>
                                    <td>${line.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total: ${detailedInvoice.total_amount}</p>
                    <p><strong>Date:</strong> {new Date(detailedInvoice.date).toLocaleDateString()}</p>
                    <p><strong>Due Date:</strong> {new Date(detailedInvoice.due_date).toLocaleDateString()}</p>
                    {!isSalesInvoice && (
                        <>
                            <p><strong>Vendor:</strong> {detailedInvoice.contact_name}</p>
                            <p><strong>Reference:</strong> {detailedInvoice.vendor_reference || 'N/A'}</p>
                            <p><strong>Notes:</strong> {detailedInvoice.notes || 'None'}</p>
                        </>
                    )}
                    {sageLink && (
                        <p><a href={sageLink} target="_blank" rel="noopener noreferrer">View Invoice on Sage</a></p>
                    )}
                    {webviewLink && (
                        <p><a href={webviewLink} target="_blank" rel="noopener noreferrer">Invoice Webview</a></p>
                    )}
                    <button className='invoice-button' onClick={() => setShowInvoiceDetails(false)}>Back to Invoices</button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className="sage-sales-invoice">
                <h1>Sage Accounting Invoicing</h1>
                {showInvoiceDetails ? (
                    renderInvoiceDetails()
                ) : (
                    <div>
                        {loading ? (
                            <p>Loading invoices...</p>
                        ) : invoices.length > 0 ? (
                            <table className="invoices-all">
                                <thead>
                                    <tr>
                                        <th>Invoice ID</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((invoice) => (
                                        <tr key={invoice.id}>
                                            <td>{invoice.displayed_as}</td>
                                            <td>
                                                <button
                                                    className='invoice-button'
                                                    onClick={() => getInvoiceDetails(invoice.id, invoiceType)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No invoices to display.</p>
                        )}
                        <div class="dropdown-button-container">
                            <button
                                className='invoice-button connect-sage-button'
                                onClick={connectToSage}
                            >
                                Connect to Sage
                            </button>
                            <div className="select-wrapper">
                                <select value={selectedInvoiceType}
                                    onChange={(e) => setSelectedInvoiceType(e.target.value)}
                                    className="select-dropdown"
                                >
                                    <option value="sales">Sales Invoices</option>
                                    <option value="purchase">Purchase Invoices</option>
                                </select>
                                <div className="select-arrow"></div>
                            </div>
                            <button
                                className='invoice-button'
                                onClick={() => getInvoices(selectedInvoiceType)}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Get All Invoices'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <SpeechButton />
            <ChatButton />
            <Footer />
        </div>
    );
};

export default AdminSalesInvoice;
