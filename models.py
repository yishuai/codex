"""
This file implements a Logistic Regression classifier

Brown cs1420, Spring 2025
"""

import random

import numpy as np


def softmax(x: np.ndarray) -> np.ndarray:
    """Calculates element-wise softmax of the input array

    Parameters
    ----------
    x : np.ndarray
        Input array

    Returns
    -------
    np.ndarray
        Softmax output of the given array x
    """
    e = np.exp(x - np.max(x))
    return (e + 1e-6) / (np.sum(e) + 1e-6)


class LogisticRegression:
    """
    Multiclass logistic regression model that learns weights using
    stochastic gradient descent (SGD).
    """

    def __init__(
        self, n_features: int, n_classes: int, batch_size: int, conv_threshold: float
    ) -> None:
        """Constructor for a LogisticRegression classifier instance

        Parameters
        ----------
        n_features : int
            The number of features in the classification problem
        n_classes : int
            The number of classes in the classification problem
        batch_size : int
            Batch size to use in SGD
        conv_threshold : float
            Convergence threshold; once reached, discontinues the optimization loop

        Attributes
        ----------
        alpha : int
            The learning rate used in SGD
        weights : np.ndarray
            Model weights
        """
        self.n_classes = n_classes
        self.n_features = n_features
        self.weights = np.zeros(
            (n_classes, n_features + 1)
        )  # NOTE: An extra row added for the bias
        self.alpha = 0.03
        self.batch_size = batch_size
        self.conv_threshold = conv_threshold

    def train(self, X: np.ndarray, Y: np.ndarray) -> int:
        """This implements the main training loop for the model, optimized
        using stochastic gradient descent.

        Parameters
        ----------
        X : np.ndarray
            A 2D Numpy array containing the datasets. Each row corresponds to one example, and
            each column corresponds to one feature. Padded by 1 column for the bias term.
        Y : np.ndarray
            A 1D Numpy array containing the labels corresponding to each example.

        Returns
        -------
        int
            Number of epochs taken to converge
        """
        prev_loss = float("inf")
        epoch = 0
        n = X.shape[0]

        while True:
            epoch += 1

            # Shuffle data for this epoch
            indices = np.random.permutation(n)
            X_shuff = X[indices]
            Y_shuff = Y[indices]

            # Mini-batch gradient descent
            for start in range(0, n, self.batch_size):
                end = start + self.batch_size
                X_batch = X_shuff[start:end]
                Y_batch = Y_shuff[start:end]

                scores = X_batch @ self.weights.T
                scores -= np.max(scores, axis=1, keepdims=True)
                exp_scores = np.exp(scores)
                probs = (exp_scores + 1e-6) / (
                    np.sum(exp_scores, axis=1, keepdims=True) + 1e-6
                )

                y_onehot = np.zeros((len(X_batch), self.n_classes))
                y_onehot[np.arange(len(X_batch)), Y_batch] = 1

                grad = (probs - y_onehot).T @ X_batch / len(X_batch)
                self.weights -= self.alpha * grad

            curr_loss = self.loss(X, Y)
            if abs(prev_loss - curr_loss) < self.conv_threshold:
                break
            prev_loss = curr_loss

        return epoch

    def loss(self, X: np.ndarray, Y: np.ndarray) -> float:
        """Calculates average log loss on the predictions made by the model
        on dataset X against the corresponding labels Y.

        Parameters
        ----------
        X : np.ndarray
            2D Numpy array representing a dataset. Each row corresponds to one example,
            and each column corresponds to one feature. Padded by 1 column for the bias.
        Y : np.ndarray
            1D Numpy array containing the corresponding labels to each example in dataset X.

        Returns
        -------
        float
            Average loss of the model on the dataset
        """
        scores = X @ self.weights.T
        scores -= np.max(scores, axis=1, keepdims=True)
        exp_scores = np.exp(scores)
        probs = (exp_scores + 1e-6) / (
            np.sum(exp_scores, axis=1, keepdims=True) + 1e-6
        )
        log_likelihood = -np.log(probs[np.arange(len(Y)), Y])
        return np.mean(log_likelihood)

    def predict(self, X: np.ndarray) -> np.ndarray:
        """Compute predictions based on the learned parameters and examples X

        Parameters
        ----------
        X : np.ndarray
            A 2D Numpy array representing a dataset. Each row corresponds to one example,
            and each column corresponds to one feature. Padded by 1 column for the bias.

        Returns
        -------
        np.ndarray
            1D Numpy array of predictions corresponding to each example in X
        """
        scores = X @ self.weights.T
        return np.argmax(scores, axis=1)

    def accuracy(self, X: np.ndarray, Y: np.ndarray) -> float:
        """Outputs the accuracy of the trained model on a given test
        dataset X and labels Y.

        Parameters
        ----------
        X : np.ndarray
            A 2D Numpy array representing a dataset. Each row corresponds to one example,
            and each column corresponds to one feature. Padded by 1 column for the bias.
        Y : np.ndarray
            1D Numpy array containing the corresponding labels to each example in dataset X.

        Returns
        -------
        float
            Accuracy percentage (between 0 and 1) on the given test set.
        """
        preds = self.predict(X)
        return np.mean(preds == Y)
