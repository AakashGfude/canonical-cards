import React from 'react';
import Card from '@canonical/react-components/dist/components/Card'


const CardComponent = ({ title, author, topic, link, category, date, imageUrl }) => {
    const children = (author, date) => {
        const dateString = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return (
            <a href={link}>
                <section>
                    <img src={imageUrl} alt={title} />
                    <h3 className="p-heading--4">{title}</h3>
                    <p><em>By <span className="p-card__author">{author}</span> on {dateString}</em></p>
                </section>
            </a>
        )
    }
    return (
        <Card>
            <header className={`p-card__header highlight--${topic.toLowerCase().replaceAll(' ', '-')}`}>
                <h5>{topic.toUpperCase()}</h5>
            </header>
            {children(author, date)}
            <p className="p-card__footer">{category.slice(0,-1)}</p>
        </Card>
    );
};

export default CardComponent;