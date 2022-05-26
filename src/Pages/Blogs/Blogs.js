import React from 'react';
import {Container} from "react-bootstrap";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const Blogs = () => {
    return (
        <>
            <Header/>
            <div className='blog-section py-80'>
                <Container>
                    <h1 className='text-center question-header'>Questions</h1>
                    <h4 className='question-title'>1. How will you improve the performance of a React Application?</h4>
                    <p className="mb-5">

                    </p>

                    <h4 className='question-title'>2. When should you use nodejs and when should you use mongodb?</h4>
                    <p className='mb-5'>
                        <strong>When should we use Nodejs?</strong><br/>
                        Any project needs a programming environment and a runtime library that offers basic programming
                        tools/support and can compile and/or interpret code. Nodejs is such as tool for the Javascript
                        programming language. There are other similar tools for other languages such as Python, Java,
                        PHP, C#, C++, Go, etc...
                        <br/>
                        So, if anyone want to write some kind of stand-alone program or server in Javascript, then
                        anyone can use nodejs for it.
                    </p>
                    <p className='mb-5'>
                        <strong>When should we use MongoDB?</strong><br/>
                        If any application needs the ability to persistently store data in a way that you can
                        efficiently query or update it later, then you would typically use some form of database. There
                        are dozens of popular databases. MongoDB is one such database. MariaDB, MySql, CouchDB, DynamoDB
                        (on AWS), Postgres are examples of other databases.
                    </p>


                    <h4 className='question-title'>3. Differences between sql and nosql databases?</h4>
                    <table className='table table-bordered mb-5'>
                        <tbody>
                        <tr>
                            <th>SQL Database</th>
                            <th>NoSQL Database</th>
                        </tr>
                        <tr>
                            <td>
                                <p>
                                    SQL is a relational database management system (RDBMS) that is used to create and
                                    manage data in a structured way.
                                </p>
                            </td>
                            <td>
                                <p>
                                    NoSQL is a database that stores data in a non-structured way.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>
                                    SQL use structured query language and have a predefined schema.
                                </p>
                            </td>
                            <td>
                                <p>
                                    NoSQL databases have dynamic schemas for unstructured data.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>
                                    SQL databases are vertically scalable table based databases.
                                </p>
                            </td>
                            <td>
                                <p>
                                    NoSQL databases are horizontally scalable.
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default Blogs;