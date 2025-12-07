/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Optional worker creation request. If name is not provided, a name will be auto-generated */
export interface WorkerCreateRequestDTO {
  /**
   * Optional name of the worker. If not provided, will be auto-generated
   * @example "worker-1"
   */
  name?: string;
}

/** Response object containing worker information */
export interface WorkerResponseDTO {
  /**
   * Unique identifier of the worker
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Name of the worker
   * @example "worker-1"
   */
  name?: string;
  /**
   * Current status of the worker
   * @example "IDLE"
   */
  status?: "IDLE" | "PROCESSING" | "STOPPED";
  /**
   * Timestamp when the worker was created
   * @format date-time
   * @example "2025-12-04T14:30:00"
   */
  createdAt?: string;
  /**
   * Timestamp of the last heartbeat from the worker
   * @format date-time
   * @example "2025-12-04T14:35:00"
   */
  lastHeartbeat?: string;
}

/** Task submission request containing task details */
export interface TaskSubmissionRequestDTO {
  /**
   * Name/description of the task to create
   * @minLength 1
   * @example "Process user data"
   */
  name: string;
  /**
   * Complexity of the task, implicitly related to time task takes to complete
   * @example "HIGH"
   */
  complexity: "LOW" | "MEDIUM" | "HIGH";
}

export interface Task {
  /** @format int64 */
  id?: number;
  name?: string;
  status?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  complexity?: "LOW" | "MEDIUM" | "HIGH";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  completedAt?: string;
  assignedWorker?: Worker;
  /** @format date-time */
  processingStartedAt?: string;
}

export interface Worker {
  /** @format int64 */
  id?: number;
  name?: string;
  status?: "IDLE" | "PROCESSING" | "STOPPED";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  lastHeartbeat?: string;
}

/** Task processing engine status information */
export interface EngineStatusResponse {
  /**
   * Current engine state
   * @example "RUNNING"
   */
  state?: "STOPPED" | "PAUSED" | "RUNNING";
  /**
   * Status message
   * @example "Engine started successfully"
   */
  message?: string;
  /**
   * Number of active workers currently processing tasks
   * @format int32
   * @example 5
   */
  activeWorkerCount?: number;
}

export interface Page {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  numberOfElements?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  /** @format int32 */
  size?: number;
  content?: any[];
  /** @format int32 */
  number?: number;
  empty?: boolean;
}

export interface PageableObject {
  sort?: SortObject;
  paged?: boolean;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  unpaged?: boolean;
  /** @format int64 */
  offset?: number;
}

export interface SortObject {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
}

/** Response object containing task information */
export interface TaskResponseDTO {
  /**
   * Unique identifier of the task
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Name/description of the task
   * @example "Process user data"
   */
  name?: string;
  /**
   * Complexity of the task, implicitly related to time task takes to complete
   * @example "HIGH"
   */
  complexity?: "LOW" | "MEDIUM" | "HIGH";
  /**
   * Current status of the task
   * @example "PENDING"
   */
  status?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  /**
   * Timestamp when the task was created
   * @format date-time
   * @example "2025-10-08T14:30:00"
   */
  createdAt?: string;
  /**
   * Timestamp when the task was completed (null if not completed)
   * @format date-time
   * @example "2025-10-08T14:35:00"
   */
  completedAt?: string;
  /**
   * ID of the worker assigned to process this task (null if not assigned)
   * @format int64
   * @example 1
   */
  assignedWorkerId?: number;
  /**
   * Name of the worker assigned to process this task (null if not assigned)
   * @example "worker-1"
   */
  assignedWorkerName?: string;
  /**
   * Timestamp when processing started (null if not started)
   * @format date-time
   * @example "2025-10-08T14:30:30"
   */
  processingStartedAt?: string;
}

/** Database clear operation response */
export interface DatabaseClearResponse {
  /**
   * Whether the operation was successful
   * @example true
   */
  success?: boolean;
  /**
   * Status message
   * @example "Database cleared successfully"
   */
  message?: string;
  /**
   * Number of tasks deleted
   * @format int64
   * @example 42
   */
  tasksDeleted?: number;
  /**
   * Number of workers deleted
   * @format int64
   * @example 5
   */
  workersDeleted?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Distributed Task Visualization API
 * @version 1.0.0
 * @license Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.html)
 * @baseUrl http://localhost:8080
 * @contact Jordi Coll <contact@jjcoll.dev>
 *
 * REST API for visualizing and managing distributed task execution across multiple nodes
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Retrieves a list of all worker instances in the system
     *
     * @tags Worker Management
     * @name GetAllWorkers
     * @summary Get all workers
     * @request GET:/api/workers
     */
    getAllWorkers: (params: RequestParams = {}) =>
      this.request<WorkerResponseDTO, any>({
        path: `/api/workers`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Creates a new worker instance. If name is not provided, it will be auto-generated (e.g., 'worker-1', 'worker-2')
     *
     * @tags Worker Management
     * @name CreateWorker
     * @summary Create a new worker
     * @request POST:/api/workers
     */
    createWorker: (data: WorkerCreateRequestDTO, params: RequestParams = {}) =>
      this.request<WorkerResponseDTO, any>({
        path: `/api/workers`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Retrieves a paginated list of tasks with optional filtering by status and complexity. Results are sorted by creation date in descending order by default.
     *
     * @tags Task Management
     * @name GetAllTasks
     * @summary Get all tasks
     * @request GET:/api/tasks
     */
    getAllTasks: (
      query?: {
        /** Filter tasks by status (e.g., PENDING, RUNNING, COMPLETED) */
        status?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
        /** Filter tasks by complexity level (e.g., LOW, MEDIUM, HIGH) */
        complexity?: "LOW" | "MEDIUM" | "HIGH";
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /**
         * Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @default ["createdAt,DESC"]
         */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Page, any>({
        path: `/api/tasks`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Submits a new task to the distributed task processing system for execution
     *
     * @tags Task Management
     * @name SubmitTask
     * @summary Submit a new task
     * @request POST:/api/tasks
     */
    submitTask: (data: TaskSubmissionRequestDTO, params: RequestParams = {}) =>
      this.request<Task, Task>({
        path: `/api/tasks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Gracefully stops all active workers. In-flight tasks will be marked as FAILED
     *
     * @tags Engine Control
     * @name StopEngine
     * @summary Stop the processing engine
     * @request POST:/api/engine/stop
     */
    stopEngine: (params: RequestParams = {}) =>
      this.request<EngineStatusResponse, EngineStatusResponse>({
        path: `/api/engine/stop`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Activates all pending workers to begin processing tasks
     *
     * @tags Engine Control
     * @name StartEngine
     * @summary Start the processing engine
     * @request POST:/api/engine/start
     */
    startEngine: (params: RequestParams = {}) =>
      this.request<EngineStatusResponse, EngineStatusResponse>({
        path: `/api/engine/start`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Resumes workers from paused state to continue processing tasks
     *
     * @tags Engine Control
     * @name ResumeEngine
     * @summary Resume the processing engine
     * @request POST:/api/engine/resume
     */
    resumeEngine: (params: RequestParams = {}) =>
      this.request<EngineStatusResponse, EngineStatusResponse>({
        path: `/api/engine/resume`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Pauses all workers. Threads remain alive but idle. Tasks not processed.
     *
     * @tags Engine Control
     * @name PauseEngine
     * @summary Pause the processing engine
     * @request POST:/api/engine/pause
     */
    pauseEngine: (params: RequestParams = {}) =>
      this.request<EngineStatusResponse, EngineStatusResponse>({
        path: `/api/engine/pause`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Retrieves details of a specific worker by its ID
     *
     * @tags Worker Management
     * @name GetWorker
     * @summary Get a worker by ID
     * @request GET:/api/workers/{id}
     */
    getWorker: (id: number, params: RequestParams = {}) =>
      this.request<WorkerResponseDTO, WorkerResponseDTO>({
        path: `/api/workers/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Stops a worker by setting its status to STOPPED
     *
     * @tags Worker Management
     * @name StopWorker
     * @summary Stop a worker
     * @request DELETE:/api/workers/{id}
     */
    stopWorker: (id: number, params: RequestParams = {}) =>
      this.request<WorkerResponseDTO, WorkerResponseDTO>({
        path: `/api/workers/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Retrieves details of a specific task by its ID
     *
     * @tags Task Management
     * @name GetTask
     * @summary Get a task by ID
     * @request GET:/api/tasks/{id}
     */
    getTask: (id: number, params: RequestParams = {}) =>
      this.request<TaskResponseDTO, TaskResponseDTO>({
        path: `/api/tasks/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Returns the health status of the API
     *
     * @tags Health
     * @name GetHealth
     * @summary check API health
     * @request GET:/api/health
     */
    getHealth: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/health`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Returns current engine state and active worker count
     *
     * @tags Engine Control
     * @name GetEngineStatus
     * @summary Get engine status
     * @request GET:/api/engine/status
     */
    getEngineStatus: (params: RequestParams = {}) =>
      this.request<EngineStatusResponse, any>({
        path: `/api/engine/status`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Removes all tasks and workers from the database. Can only be called when simulation is stopped.
     *
     * @tags Database Management
     * @name ClearDatabase
     * @summary Clear all database data
     * @request DELETE:/api/database/clear
     */
    clearDatabase: (params: RequestParams = {}) =>
      this.request<DatabaseClearResponse, DatabaseClearResponse>({
        path: `/api/database/clear`,
        method: "DELETE",
        ...params,
      }),
  };
}
