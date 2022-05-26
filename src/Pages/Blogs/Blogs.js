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
                        React applications perform better when they are written in a modular way. This means that the application is divided into smaller parts. The components are written in a way that they can be reused. This is the key to the performance of the application. On the other side, by keeping component state in the component, the application can be easily updated. By optimizing images, the application can be optimized. And vituralize the long list of data, the application can be optimized.
                    </p>

                    <h4 className='question-title'>2. What are the different ways to manage a state in a React application?</h4>
                    <p className='mb-5'>
                        There are four ways to manage the state in a React application.
                        <ol>
                            <li>Global State</li>
                            <li>Local State</li>
                            <li>Server State</li>
                            <li>Url State</li>
                        </ol>
                        <p><strong>1. Global State</strong> is data we can manage anywhere in our app. Such as, Authentication, User Data, etc.</p>
                        <p><strong>2. Local State</strong> is data we can manage in a component. Such as, User Input, Form Data, etc. Local state is often managed using the useState hook.</p>
                        <p><strong>3. Server State</strong> is data we can manage in the server. Such as, Database, etc. It is usually managed using the useEffect hook.</p>
                        <p><strong>4. Url State</strong> is data we can manage in the url. Such as, Query String, etc. It is usually managed using the useEffect hook.</p>
                    </p>

                    <h4 className='question-title'>3. How does prototypical inheritance work?</h4>
                    <p className="mb-5">
                        When we create a new object, it is created with the prototype of the object it is created from. This means that the new object inherits the properties of the object it is created from. This is called prototypical inheritance. The Object.prototype is the prototype of all objects. This means that all objects inherit the properties of the Object.prototype. For example, Date.prototype is the prototype of all Date objects. Overall this is how prototypical inheritance works.
                    </p>

                    <h4 className='question-title'>4. You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h4>
                    <p className="mb-5">
                        We can use the filter method to find products by name.
                        <pre>
                            <code>
{`
    const products = [
        {
            name: 'Product 1',
            price: 10,
            description: 'This is product 1'
        },
        {
            name: 'Product 2',
            price: 20,
            description: 'This is product 2'
        },
        {
            name: 'Product 3',
            price: 30,
            description: 'This is product 3'
        }
    ];
    const filteredProducts = products.filter(product => product.name === 'Product 2');
`}
                            </code>
                            <h5>Output: </h5>
                            <code>
{`
    [{
        name: 'Product 2',
        price: 20,
        description: 'This is product 2'
    }]
`}
                            </code>
                        </pre>
                    </p>

                    <h4 className='question-title'>5. What is a unit test? Why should write unit tests?</h4>
                    <p className="mb-5">
                        Unit tests are tests that are written to test a single unit of code. For example, if we have a function that adds two numbers, we can write a unit test to test that the function adds two numbers correctly. Software developers write unit tests to test the functionality of their code. It helps to make sure that the code is working as expected. To make sure that the code is working as expected, that's why we should write unit tests.
                    </p>
                </Container>
            </div>
            <Footer/>
        </>
    );
};

export default Blogs;