import cx from 'classnames'
import { ReactNode, useMemo } from 'react'
import Typography from '../Typography/Typography'
import ImdbIcon from './ImdbLogo/ImdbIcon'
import RottenIcon from './RottenLogo/RottenLogo'

interface Props {
    className?: string
    children: ReactNode
    logo?: 'imdb' | 'rotten'
}

const Labels = ({ className, children, logo }: Props) => {
    const logoIcon = useMemo(() => {
        if (!logo) {
            return null
        }

        switch (logo) {
            case 'imdb':
                return <ImdbIcon />
            case 'rotten':
                return <RottenIcon />
        }
    }, [logo])
    return (
        <div className={cx('labels', { labels__logo: logo }, className)}>
            {logoIcon}
            <div className="labels__content">
                <Typography
                    className="labels__typography"
                    element="span"
                    size="medium"
                >
                    {children}
                </Typography>
            </div>
            <style jsx>{`
                .labels__logo {
                    display: inline-flex;
                    border-radius: var(--theme-border-radius);
                    overflow: hidden;
                }

                .labels__logo :global(.labels__content) {
                    padding: 0.5rem;
                    background-color: transparent;
                    border-radius: 0 4px 4px 0;
                    border-width: 1px 1px 1px 0;
                    border-style: solid;
                    border-color: var(--theme-color-mid-grey);
                }
                .labels__content {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.25rem 0.375rem;
                    background-color: var(--theme-color-light-grey);
                    border-radius: var(--theme-border-radius);
                }

                .labels:not(.labels__logo) :global(.labels__typography) {
                    color: var(--theme-color-dark);
                }
            `}</style>
        </div>
    )
}

export default Labels
